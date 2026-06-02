import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/site/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fortapac | Built to carry" },
      {
        name: "description",
        content:
          "Woven polypropylene packaging — FIBC bulk bags, PP sacks and covers. Factory-direct from our parent producer, stocked and supported in Sweden.",
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
  component: Index,
});

const homeHtml = `
<main>
  <section class="hero">
    <div class="hero-placeholder"><div class="label">Hero photography</div></div>
    <div class="hero-wrap hero-shell">
      <div class="hero-content">
        <h1>Built<br>to carry<span style="color:var(--orange)">.</span></h1>
        <p>FIBC bulk bags, PP sacks and protective covers — manufactured at our parent factory, stocked and serviced in Sweden. Factory-direct, without the middleman.</p>
        <div class="hero-actions">
          <a class="button primary" href="#products">Explore products <span class="arrow">→</span></a>
          <a class="button dark" href="#contact">Get a quote <span class="arrow">→</span></a>
        </div>
        <div class="made-in mono"><span class="flag"></span> Stocked &amp; supported in Sweden</div>
      </div>
    </div>
  </section>

  <section id="products">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="eyebrow mono">Our products</div>
          <h2>Engineered woven packaging for heavy work.</h2>
        </div>
        <a class="view-link mono" href="#">View all products <span class="arrow">→</span></a>
      </div>
      <div class="products-grid">
        <article class="product-card"><div><img class="product-image" src="/products/fibc-bulk-bags.png" alt="FIBC bulk bag illustration" loading="lazy"><h3>FIBC Bulk Bags</h3><p>Heavy duty bulk bags for powders, granules and commodities.</p></div><div class="mono">SWL 500–2000 kg</div></article>
        <article class="product-card"><div><img class="product-image" src="/products/pp-woven-sacks.png" alt="PP woven sack illustration" loading="lazy"><h3>PP Woven Sacks</h3><p>Strong and versatile sacks for industrial and agricultural applications.</p></div><div class="mono">10–100 kg capacity</div></article>
        <article class="product-card"><div><img class="product-image" src="/products/forestry-covers.png" alt="Forestry covers illustration" loading="lazy"><h3>Forestry Covers</h3><p>Durable covers for timber stacks and forestry operations.</p></div><div class="mono">UV stabilised</div></article>
        <article class="product-card"><div><img class="product-image" src="/products/covers-liners.png" alt="Covers and liners illustration" loading="lazy"><h3>Covers &amp; Liners</h3><p>Protective covers and liners built for transport, storage and site use.</p></div><div class="mono">Custom made</div></article>
      </div>
    </div>
  </section>

  <div class="spec-row">
    <div class="wrap spec-grid">
      <div><div class="eyebrow mono">Technical by design</div><h2 style="font-size:clamp(2rem,3vw,3rem)">Built to perform.<br>Spec by spec.</h2></div>
      <div class="spec-card"><svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 22h28l5 32H13l5-32Z"/><path d="M24 22a8 8 0 0 1 16 0"/></g></svg><div class="spec-value">1,000–2,000 kg</div><div class="mono">SWL range</div></div>
      <div class="spec-card"><svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 8l20 8v13c0 13-8 22-20 27-12-5-20-14-20-27V16l20-8Z"/><path d="m23 31 6 6 13-15"/></g></svg><div class="spec-value">5:1</div><div class="mono">Safety factor</div></div>
      <div class="spec-card"><svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="9"/><path d="M32 7v8M32 49v8M7 32h8M49 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6"/></g></svg><div class="spec-value">UV</div><div class="mono">Stabilised</div></div>
      <div class="spec-card"><svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M25 14l7-7 7 7"/><path d="M32 7v17"/><path d="M47 37l3 10-10 3"/><path d="M50 47 36 39"/><path d="M17 50 7 47l3-10"/><path d="M7 47l14-8"/></g></svg><div class="spec-value">100%</div><div class="mono">Recyclable PP</div></div>
    </div>
  </div>

  <section id="industries" class="industries">
    <div class="wrap industry-layout">
      <div>
        <div class="eyebrow mono">Built for industry</div>
        <h2 style="font-size:2.35rem">Trusted across the industries that build our world.</h2>
        <a class="view-link mono" style="margin-top:2rem" href="#">Explore industries <span class="arrow">→</span></a>
      </div>
      <div class="industry-grid">
        <article class="industry-card"><div class="placeholder-image">Construction</div><h3>Construction</h3></article>
        <article class="industry-card"><div class="placeholder-image">Agriculture</div><h3>Agriculture</h3></article>
        <article class="industry-card"><div class="placeholder-image">Chemicals</div><h3>Chemicals</h3></article>
        <article class="industry-card"><div class="placeholder-image">Forestry</div><h3>Forestry</h3></article>
        <article class="industry-card"><div class="placeholder-image">Logistics</div><h3>Logistics</h3></article>
      </div>
    </div>
  </section>

  <section id="materials" class="material">
    <div class="material-grid">
      <div class="placeholder-fill"><div class="tag">Weave macro</div></div>
      <div class="material-copy">
        <div>
          <div class="eyebrow mono">Material &amp; craftsmanship</div>
          <h2>Strength you can see.</h2>
          <p style="margin:1.25rem 0 1.75rem;max-width:560px">Woven from high grade polypropylene tapes using precision loom technology. Our warp and weft construction delivers tensile strength, clear fills and long service life in the field, in ports and on the job.</p>
          <a class="button light" href="#">Learn more about our materials <span class="arrow">→</span></a>
        </div>
        <div class="weave-diagram">
          <svg viewBox="0 0 240 240" aria-hidden="true">
            <g fill="none" stroke="#102A43" stroke-width="5">
              <path d="M45 25v170M75 25v170M105 25v170M135 25v170M165 25v170M195 25v170"/>
              <path d="M25 45h170M25 75h170M25 105h170M25 135h170M25 165h170M25 195h170"/>
            </g>
            <path d="M150 60h55" stroke="#DE5B26" stroke-width="4"/>
            <path d="M150 160h55" stroke="#5E7790" stroke-width="4"/>
            <text x="154" y="53" font-family="IBM Plex Mono, monospace" font-size="10" fill="#102A43">WARP</text>
            <text x="154" y="153" font-family="IBM Plex Mono, monospace" font-size="10" fill="#102A43">WEFT</text>
          </svg>
        </div>
      </div>
    </div>
  </section>

  <section id="sustainability" class="sustainability">
    <div class="sustainability-grid">
      <div><div class="eyebrow mono">Better by design</div><h2 style="font-size:2.5rem">Practical today.<br>Responsible tomorrow.</h2></div>
      <div><svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M25 14l7-7 7 7"/><path d="M32 7v17"/><path d="M47 37l3 10-10 3"/><path d="M50 47 36 39"/><path d="M17 50 7 47l3-10"/><path d="M7 47l14-8"/></g></svg><h3>Reusable by nature</h3><p>Built for repeat use, designed to reduce single use waste and lower total cost.</p></div>
      <div><svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M52 12C27 12 14 25 13 52c26-2 39-15 39-40Z"/><path d="M14 51c9-15 20-24 37-37"/></g></svg><h3>Lower impact</h3><p>Polypropylene is lightweight, recyclable and efficient for safer transport.</p></div>
      <div><svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="22"/><path d="M10 32h44M32 10c8 8 8 36 0 44M32 10c-8 8-8 36 0 44"/></g></svg><h3>Engineered to last</h3><p>UV stabilised and field proven, made to handle real conditions for longer.</p></div>
      <div><div class="placeholder-fill"><div class="tag">Sewn-in label</div></div></div>
    </div>
  </section>

  <section id="contact" class="cta">
    <div class="wrap cta-inner">
      <div class="woven-lines"></div>
      <div>
        <h2 style="font-size:2rem">Need the right bag for the job?</h2>
        <p style="color:rgba(255,255,255,.8);max-width:620px">Our Swedish team specs your bag, our factory builds it. Fast quotes, factory pricing, proven performance.</p>
      </div>
      <a class="button primary" href="mailto:hello@fortapac.se">Get a quote <span class="arrow">→</span></a>
    </div>
  </section>
</main>
`;

function Index() {
  return (
    <SiteLayout>
      <div dangerouslySetInnerHTML={{ __html: homeHtml }} />
    </SiteLayout>
  );
}
