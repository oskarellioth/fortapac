/**
 * Fortapac English to Swedish terminology.
 *
 * This is the part that matters. General-purpose machine translation handles
 * ordinary prose fine, and then quietly ruins the trade vocabulary: "bulk bag"
 * comes back as "lösviktspåse" rather than "storsäck", "pulpwood" as "massa
 * trä" rather than "massaved". A Swedish buyer reads those and concludes the
 * supplier does not know the industry. Anyone reviewing the output who is not
 * a native speaker cannot see the mistake.
 *
 * Every entry is therefore a rule, not a suggestion. The model is instructed
 * to treat these as fixed.
 *
 * Adding a term: put it here rather than correcting the same mistranslation
 * repeatedly by hand. Terms that must stay in English go in KEEP_IN_ENGLISH.
 */

export type GlossaryEntry = {
  en: string;
  sv: string;
  /** Why, when the choice is not obvious or a wrong-but-plausible option exists. */
  note?: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  // Products
  { en: "bulk bag", sv: "storsäck", note: "never 'lösviktspåse' or 'bulkpåse'" },
  { en: "FIBC bulk bag", sv: "FIBC storsäck" },
  { en: "woven sack", sv: "vävd säck" },
  { en: "open-mouth sack", sv: "säck med öppen mynning" },
  { en: "valve sack", sv: "ventilsäck" },
  { en: "leno sack", sv: "leno-säck", note: "leno is a weave type, keep the word" },
  { en: "liner", sv: "innerpåse", note: "'liner' is also used in trade; prefer innerpåse in body copy" },
  { en: "container liner", sv: "containerliner" },
  { en: "tarpaulin", sv: "presenning" },
  { en: "ground cover", sv: "markduk" },
  { en: "protective cover", sv: "skyddsöverdrag" },
  { en: "lumber cover", sv: "virkesöverdrag" },
  { en: "lifting loop", sv: "lyftögla" },

  // Materials
  { en: "woven polypropylene", sv: "vävt polypropylen" },
  { en: "polypropylene", sv: "polypropylen", note: "not 'polypropylene'" },
  { en: "polypropylene tape", sv: "polypropylentejp" },
  { en: "loom", sv: "vävstol" },
  { en: "loom programme", sv: "vävprogram" },
  { en: "warp", sv: "varp" },
  { en: "weft", sv: "inslag", note: "not 'väft'" },
  { en: "weave", sv: "väv" },
  { en: "fabric on the roll", sv: "väv på rulle" },
  { en: "coating", sv: "beläggning" },

  // Specs and technical
  { en: "safety factor", sv: "säkerhetsfaktor" },
  { en: "UV stabilised", sv: "UV-stabiliserad" },
  { en: "recyclable", sv: "återvinningsbar" },
  { en: "load rating", sv: "lastklassning" },
  { en: "tensile strength", sv: "draghållfasthet" },
  { en: "service life", sv: "livslängd" },

  // Materials handled
  { en: "pulpwood", sv: "massaved", note: "never 'massa trä'" },
  { en: "wood chip", sv: "flis" },
  { en: "timber", sv: "timmer" },
  { en: "timber stack", sv: "timmerstapel" },
  { en: "grain", sv: "spannmål", note: "the crop, not 'korn' which is barley" },
  { en: "seeds", sv: "utsäde", note: "agricultural seed for sowing, not 'frön'" },
  { en: "feed", sv: "foder", note: "animal feed" },
  { en: "fertiliser", sv: "gödsel" },
  { en: "aggregates", sv: "ballast", note: "construction aggregate, not 'aggregat'" },
  { en: "granules", sv: "granulat" },
  { en: "powder", sv: "pulver" },
  { en: "ore", sv: "malm" },

  // Commercial
  { en: "quote", sv: "offert" },
  { en: "get a quote", sv: "begär offert" },
  { en: "lead time", sv: "leveranstid" },
  { en: "stock", sv: "lager" },
  { en: "in stock", sv: "i lager" },
  { en: "middleman", sv: "mellanhand" },
  { en: "trading house", sv: "handelshus" },
  { en: "supply chain", sv: "leverantörskedja" },
  { en: "factory direct", sv: "direkt från fabrik" },
  { en: "publicly listed", sv: "börsnoterad" },
  { en: "joint venture", sv: "joint venture", note: "used untranslated in Swedish business copy" },
  { en: "spec", sv: "spec", note: "informal, matches the brand voice" },
  { en: "specification", sv: "specifikation" },

  // Industries
  { en: "construction", sv: "bygg" },
  { en: "agriculture", sv: "jordbruk" },
  { en: "chemicals", sv: "kemi" },
  { en: "forestry", sv: "skogsbruk" },
  { en: "mining", sv: "gruva" },
  { en: "logistics", sv: "logistik" },
  { en: "warehouse", sv: "lager" },
  { en: "site", sv: "arbetsplats", note: "a work site, not 'plats' or 'sajt'" },
  { en: "forklift", sv: "truck", note: "not 'gaffeltruck' in everyday Swedish usage" },
];

/** Acronyms and units that must survive untranslated. */
export const KEEP_IN_ENGLISH = [
  "FIBC",
  "SWL",
  "PP",
  "PE",
  "UV",
  "UN",
  "Fortapac",
  "kg",
  "h",
];

/**
 * House style, separate from vocabulary.
 *
 * The em dash rule matters as much as the glossary: it is a standing
 * instruction on this project, and a translator left to its own devices will
 * reintroduce them, since em dashes are common in the English source.
 */
export const STYLE_RULES = [
  "Never use an em dash (—). Use a comma, semicolon, colon, full stop or parentheses instead.",
  "Keep en dashes (–) in numeric ranges such as 500–2 000 kg.",
  "Swedish thousands separator is a space, not a comma: 2 000 kg, not 2,000 kg.",
  "Plain-spoken and technical. Prefer concrete numbers over adjectives.",
  "Address the reader as 'du', not 'ni', unless the source is clearly addressing a company.",
  "Do not add words the English does not contain. Do not pad or embellish.",
  "Match the source's sentence count and rough length. This is UI copy in a fixed layout.",
  "Preserve **bold markers** exactly where they sit around the equivalent Swedish words.",
  "Preserve leading and trailing whitespace, and any punctuation that ends the string.",
];

/** Rendered once into the cached system prompt. */
export function glossaryPromptSection(): string {
  const terms = GLOSSARY.map((g) =>
    g.note ? `- "${g.en}" → "${g.sv}"  (${g.note})` : `- "${g.en}" → "${g.sv}"`,
  ).join("\n");

  const rules = STYLE_RULES.map((r) => `- ${r}`).join("\n");

  return [
    "REQUIRED TERMINOLOGY",
    "These translations are fixed. Use them, inflecting for grammar as Swedish requires.",
    "",
    terms,
    "",
    "NEVER TRANSLATE THESE",
    KEEP_IN_ENGLISH.map((k) => `- ${k}`).join("\n"),
    "",
    "STYLE",
    rules,
  ].join("\n");
}
