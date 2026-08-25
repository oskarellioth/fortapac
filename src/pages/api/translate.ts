import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";
import { glossaryPromptSection } from "../../lib/glossary";

export const prerender = false;

/**
 * English to Swedish translation for the CMS.
 *
 * Takes a batch of strings in one request rather than one call per field: a
 * page has dozens of strings, and batching keeps the glossary prompt cached
 * across the whole page instead of re-sending it per field.
 *
 * Output is never written anywhere. It comes back to the review screen, and a
 * human has to accept it before it reaches src/content. That is the point of
 * the design: the glossary makes the machine output good, the review step
 * means a bad term still cannot ship silently.
 */

const SYSTEM = `You translate B2B industrial packaging copy from English into Swedish for Fortapac, a Swedish supplier of woven polypropylene packaging: FIBC bulk bags, PP sacks, covers and liners.

Your translations are read by Swedish procurement managers, site foremen and purchasing staff. They know the trade vocabulary. A wrong technical term reads as though the supplier does not know the industry, so terminology accuracy matters more than elegant prose.

${glossaryPromptSection()}

OUTPUT
Return only a JSON array of strings: the translations, in the same order as the input, one per input string. No commentary, no markdown fence, no object wrapper. If an input string is empty, return an empty string in that position.`;

type Body = { texts?: unknown };

export const POST: APIRoute = async ({ request }) => {
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "content-type": "application/json" },
    });

  if (!process.env.ANTHROPIC_API_KEY) {
    return json(
      {
        error:
          "ANTHROPIC_API_KEY is not set. Add it to .env locally, or to the Vercel project's environment variables.",
      },
      500,
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: "Request body was not valid JSON." }, 400);
  }

  const texts = body.texts;
  if (!Array.isArray(texts) || texts.some((t) => typeof t !== "string")) {
    return json({ error: "Expected { texts: string[] }." }, 400);
  }
  if (texts.length === 0) return json({ translations: [] });
  if (texts.length > 60) {
    return json({ error: "Too many strings in one request. Send 60 or fewer." }, 400);
  }

  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 16000,
      // The glossary runs to a few thousand tokens and never varies, so cache
      // it. Only the strings being translated change between requests.
      system: [
        {
          type: "text",
          text: SYSTEM,
          cache_control: { type: "ephemeral" },
        },
      ],
      thinking: { type: "adaptive" },
      // Terminology lookup and short-form copy, not deep reasoning. Low effort
      // keeps this responsive enough to sit behind a button in the admin.
      output_config: { effort: "low" },
      messages: [
        {
          role: "user",
          content: `Translate these ${texts.length} strings into Swedish:\n\n${JSON.stringify(texts, null, 2)}`,
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      return json({ error: "The translation request was declined." }, 502);
    }

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    // Strip a markdown fence if one slipped through despite the instruction.
    const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");

    let translations: unknown;
    try {
      translations = JSON.parse(cleaned);
    } catch {
      return json({ error: "Model did not return parseable JSON.", raw: cleaned }, 502);
    }

    if (!Array.isArray(translations) || translations.length !== texts.length) {
      return json(
        {
          error: `Expected ${texts.length} translations, got ${
            Array.isArray(translations) ? translations.length : "a non-array"
          }.`,
        },
        502,
      );
    }

    return json({
      translations: translations.map((t) => (typeof t === "string" ? t : "")),
      usage: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
        cacheRead: response.usage.cache_read_input_tokens ?? 0,
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return json({ error: "ANTHROPIC_API_KEY was rejected." }, 401);
    }
    if (error instanceof Anthropic.RateLimitError) {
      return json({ error: "Rate limited. Wait a moment and try again." }, 429);
    }
    if (error instanceof Anthropic.APIError) {
      return json({ error: `Anthropic API error ${error.status}: ${error.message}` }, 502);
    }
    return json({ error: error instanceof Error ? error.message : "Unknown error." }, 500);
  }
};
