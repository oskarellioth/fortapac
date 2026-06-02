import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Fortapac | Swedish presence. Factory direct." },
      {
        name: "description",
        content:
          "Fortapac is a Swedish–Indian joint venture: half-owned by a publicly listed woven polypropylene producer, half-owned by our Swedish sales and support team. Built at the factory, sold without the middleman.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <main>
        <section className="about-hero">
          <div className="wrap">
            <div className="eyebrow mono">About Fortapac</div>
            <h1>
              Swedish presence.
              <br />
              Factory direct<span>.</span>
            </h1>
            <p>
              Fortapac is a Swedish–Indian joint venture. Half-owned by a publicly listed woven polypropylene
              producer, half-owned by the Swedish team you work with. Industrial-scale manufacturing on one side,
              local accountability on the other — and nothing in between.
            </p>
          </div>
        </section>

        <section className="about-pillars-section">
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <div>
                <div className="eyebrow mono">How we&apos;re built</div>
                <h2 style={{ fontSize: "clamp(2rem,3vw,2.75rem)" }}>Three things you can count on.</h2>
              </div>
            </div>
            <div className="about-pillars-grid">
              <div className="about-pillar">
                <span className="num">01 — Local</span>
                <h3>Swedish-led</h3>
                <p>
                  Sales, stock and technical support based in Sweden. You talk to the people responsible for your
                  order, on Swedish business hours, in your time zone.
                </p>
              </div>
              <div className="about-pillar">
                <span className="num">02 — Direct</span>
                <h3>Factory direct</h3>
                <p>
                  Built at our parent&apos;s loom rooms, shipped to our Swedish warehouse, and on to your site. No
                  trading-house markup, no extra quality middleman, no broken phone line between you and the spec.
                </p>
              </div>
              <div className="about-pillar">
                <span className="num">03 — Backed</span>
                <h3>Listed-partner backed</h3>
                <p>
                  Half-owned by a publicly listed manufacturing partner. Industrial-scale capacity, audited
                  financials, and the supply security that comes with both — without you ever needing to chase a
                  factory directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-story">
          <div className="wrap">
            <div className="about-story-grid">
              <div>
                <div className="eyebrow mono">Why it matters</div>
                <h2>Built around two strengths.</h2>
                <div className="rule" />
              </div>
              <div>
                <p>
                  Most importers of woven polypropylene packaging are trading houses: a website, a desk in
                  Stockholm and a long phone line to a factory you&apos;ve never visited. We&apos;re built
                  differently.
                </p>
                <p>
                  Fortapac is half-owned by the <strong>factory itself</strong> — a publicly listed manufacturer
                  with significant woven PP capacity — and half-owned by the <strong>Swedish team</strong> you
                  work with day to day. Two owners, one accountable supply chain.
                </p>
                <p>
                  That structure changes what we can offer. We control the loom programme, so we can guarantee
                  specs. We&apos;re inside the manufacturing margin, so we can pass on factory pricing. And we
                  hold stock in Sweden of the lines our customers use most, so a forklift breakdown or a
                  last-minute job doesn&apos;t mean a six-week lead time from Asia.
                </p>
                <p>
                  We engineer, we specify, we test, we audit. Our parent manufactures. You get one Swedish point
                  of contact and one accountable supply chain. That&apos;s the model.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="cta">
          <div className="wrap cta-inner">
            <div className="woven-lines"></div>
            <div>
              <h2 style={{ fontSize: "2rem" }}>Want to talk to the Swedish team?</h2>
              <p style={{ color: "rgba(255,255,255,.8)", maxWidth: "620px" }}>
                Tell us about your load, site and conditions. We&apos;ll spec the right bag, quote in days, and
                ship from stock when we can.
              </p>
            </div>
            <a className="button primary" href="mailto:hello@fortapac.se">
              Get in touch <span className="arrow">→</span>
            </a>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
