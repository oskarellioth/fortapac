import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

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

const css = `
:root {
  --navy:#102A43; --deep:#061B2D; --orange:#DE5B26; --paper:#F5F3EE; --cloud:#D8D3C7; --forest:#1E6B47; --ink:#0B1B2D; --line:rgba(16,42,67,.14); --line-light:rgba(255,255,255,.18); --max:1200px;
}
.fortapac, .fortapac *{box-sizing:border-box}
.fortapac{margin:0;background:var(--paper);color:var(--ink);font-family:"IBM Plex Sans",Arial,sans-serif;line-height:1.5}
.fortapac img{display:block;max-width:100%}
.fortapac a{color:inherit;text-decoration:none}
.fortapac .wrap{width:calc(100% - 80px);margin:0 auto}
.fortapac .hero-wrap{width:calc(100% - 80px);margin:0 auto}
.fortapac .mono{font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem;font-weight:600}
.fortapac .eyebrow{color:var(--orange);margin-bottom:.55rem}
.fortapac h1,.fortapac h2,.fortapac h3{font-family:"Archivo",Arial,sans-serif;line-height:.94;letter-spacing:-.045em;margin:0}
.fortapac h1{font-size:clamp(4rem, 8vw, 7rem);font-weight:900;color:#fff}
.fortapac h2{font-size:clamp(2rem, 4vw, 3.75rem);font-weight:900}
.fortapac h3{font-size:1.25rem;font-weight:800;letter-spacing:-.025em}
.fortapac .button{display:inline-flex;align-items:center;justify-content:center;gap:1rem;min-height:52px;padding:0 1.55rem;border:1px solid rgba(255,255,255,.65);border-radius:6px;font-family:"Archivo",Arial,sans-serif;font-size:.85rem;font-weight:800;text-transform:uppercase;letter-spacing:.02em;transition:.2s;cursor:pointer}
.fortapac .button:hover{transform:translateY(-2px)}
.fortapac .button.primary{background:var(--orange);border-color:var(--orange);color:#fff}
.fortapac .button.dark{background:transparent;color:#fff}
.fortapac .button.light{border-color:var(--navy);color:var(--navy)}
.fortapac .arrow{font-size:1.2rem}

.fortapac .site-header{position:sticky;top:0;z-index:10;background:rgba(6,27,45,.94);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.12);color:#fff}
.fortapac .header-inner{height:78px;display:flex;align-items:center;justify-content:space-between;gap:2rem}
.fortapac .brand{display:inline-flex;width:212px;color:inherit}
.fortapac .brand svg{width:100%;height:auto}
.fortapac .nav{display:flex;gap:clamp(1rem,3vw,3rem);align-items:center}
.fortapac .nav a,.fortapac .nav button.mega-trigger-btn{font-family:"Archivo",Arial,sans-serif;font-size:.78rem;font-weight:800;text-transform:uppercase;color:rgba(255,255,255,.92);letter-spacing:.02em}
.fortapac .nav button.mega-trigger-btn{background:none;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:.45rem;padding:0;line-height:1;position:relative}
.fortapac .nav .mega-wrap{position:relative;display:inline-flex;align-items:center;height:78px}
.fortapac .nav .mega-wrap.open button.mega-trigger-btn{color:var(--orange)}
.fortapac .nav .mega-wrap.open::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--orange)}
.fortapac .mega-trigger-btn .chev{display:inline-block;transition:transform .2s;font-size:.85rem}
.fortapac .nav .mega-wrap.open .chev{transform:rotate(180deg)}
.fortapac .menu-button{display:none;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer}

.fortapac .mega{position:fixed;left:0;right:0;top:78px;background:var(--paper);color:var(--ink);box-shadow:0 30px 60px -20px rgba(6,27,45,.45);z-index:20;border-top:1px solid rgba(255,255,255,.12)}
.fortapac .mega-grid{display:grid;grid-template-columns:1fr 1.35fr 1.45fr;min-height:480px}
.fortapac .mega-intro{padding:3rem 2.5rem;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:1.25rem}
.fortapac .mega-intro h3{font-family:"Archivo",Arial,sans-serif;font-size:1.7rem;font-weight:900;line-height:1.05;letter-spacing:-.035em;margin:0}
.fortapac .mega-intro .rule{width:64px;height:3px;background:var(--orange)}
.fortapac .mega-intro p{margin:0;color:rgba(11,27,45,.7);font-size:.95rem;max-width:280px}
.fortapac .mega-intro .button{align-self:flex-start;margin-top:auto}
.fortapac .mega-list{display:flex;flex-direction:column;border-right:1px solid var(--line)}
.fortapac .mega-item{display:grid;grid-template-columns:84px 1fr 24px;gap:1.25rem;align-items:center;padding:1.4rem 2rem;border-bottom:1px solid var(--line);position:relative;transition:background .15s;cursor:pointer;text-align:left;background:transparent;border-left:none;border-right:none;border-top:none;width:100%;font-family:inherit;color:inherit}
.fortapac .mega-item:last-child{border-bottom:none}
.fortapac .mega-item.active{background:rgba(255,255,255,.55)}
.fortapac .mega-item.active::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--orange)}
.fortapac .mega-icon{display:grid;place-items:center}
.fortapac .mega-icon img{width:64px;height:64px;object-fit:contain;mix-blend-mode:multiply}
.fortapac .mega-item h4{font-family:"Archivo",Arial,sans-serif;font-size:1rem;font-weight:800;letter-spacing:-.01em;margin:0 0 .3rem;text-transform:uppercase}
.fortapac .mega-item p{margin:0;font-size:.85rem;color:rgba(11,27,45,.7);line-height:1.4}
.fortapac .mega-item .arrow{color:var(--orange);font-size:1.1rem;justify-self:end}
.fortapac .mega-showcase{background:var(--deep);color:#fff;display:flex;flex-direction:column;padding:1.5rem}
.fortapac .mega-photo{flex:1;display:grid;place-items:center;min-height:300px;border:1px dashed rgba(255,255,255,.2);font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.16em;font-size:.7rem;color:rgba(255,255,255,.5);background:linear-gradient(135deg,rgba(255,255,255,.03),rgba(255,255,255,.08));margin-bottom:1.5rem;overflow:hidden;position:relative}
.fortapac .mega-photo .tag{padding:.5rem .85rem;border:1px solid rgba(255,255,255,.2)}
.fortapac .mega-specs{display:grid;grid-template-columns:repeat(4,1fr)}
.fortapac .mega-specs > div{display:flex;flex-direction:column;align-items:center;text-align:center;gap:.35rem;padding:.5rem .75rem;border-right:1px solid rgba(255,255,255,.1)}
.fortapac .mega-specs > div:last-child{border-right:none}
.fortapac .mega-specs svg{width:22px;height:22px;color:#fff;margin-bottom:.15rem}
.fortapac .mega-specs .label{font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.1em;font-size:.6rem;color:rgba(255,255,255,.65);line-height:1.2}
.fortapac .mega-specs .val{font-family:"IBM Plex Mono",monospace;font-size:.85rem;font-weight:600;color:#fff;line-height:1.2}
.fortapac .mega-addons{display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:1rem 2rem;background:#fff;border-top:1px solid var(--line);font-family:"Archivo",Arial,sans-serif;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--navy);flex-wrap:wrap}
.fortapac .mega-addons .dot{color:var(--orange);font-style:normal;margin:0 .25rem}

.fortapac .hero{position:relative;min-height:720px;overflow:hidden;background:var(--navy);color:#fff}
.fortapac .hero::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg, rgba(6,27,45,.96) 0%, rgba(6,27,45,.84) 28%, rgba(6,27,45,.44) 50%, rgba(6,27,45,.12) 73%, rgba(6,27,45,.08) 100%);z-index:2}
.fortapac .hero-placeholder{position:absolute;inset:0;left:42%;display:flex;align-items:center;justify-content:center;border-left:1px dashed rgba(255,255,255,.22);z-index:1}
.fortapac .hero-placeholder .label{font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.16em;font-size:.7rem;color:rgba(255,255,255,.45);padding:.55rem .9rem;border:1px solid rgba(255,255,255,.22)}
.fortapac .hero-shell{position:relative;z-index:3;min-height:720px;display:flex;align-items:center;justify-content:flex-start}
.fortapac .hero-content{max-width:560px;padding:110px 0 70px 0}
.fortapac .hero-content p{font-size:clamp(1.1rem,1.6vw,1.35rem);max-width:520px;margin:1.6rem 0 2.2rem;color:rgba(255,255,255,.9)}
.fortapac .hero-actions{display:flex;gap:1rem;flex-wrap:wrap}
.fortapac .made-in{display:flex;align-items:center;gap:.75rem;margin-top:3rem;color:rgba(255,255,255,.86)}
.fortapac .flag{width:27px;height:18px;background:linear-gradient(90deg,transparent 0 30%,#F6C445 30% 45%,transparent 45%),linear-gradient(0deg,transparent 0 38%,#F6C445 38% 56%,transparent 56%),#1266B0;box-shadow:0 0 0 1px rgba(255,255,255,.12) inset}

.fortapac section{padding:78px 0}
.fortapac .section-head{display:flex;align-items:end;justify-content:space-between;gap:2rem;margin-bottom:2rem}
.fortapac .view-link{display:inline-flex;gap:.75rem;align-items:center;white-space:nowrap;color:var(--navy)}

.fortapac .products-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem}
.fortapac .product-card{background:#fff;border:1px solid var(--line);padding:2rem;min-height:260px;display:flex;flex-direction:column;justify-content:space-between}
.fortapac .product-card svg{width:54px;height:54px;color:var(--navy);margin-bottom:1.4rem}
.fortapac .product-card .product-image{width:100%;height:150px;object-fit:contain;object-position:center;margin-bottom:1.2rem;mix-blend-mode:multiply}
.fortapac .product-card p{margin:.7rem 0 0;color:rgba(11,27,45,.76)}

.fortapac .spec-row{background:linear-gradient(110deg,var(--deep),var(--navy));color:#fff;padding:52px 0}
.fortapac .spec-grid{display:grid;grid-template-columns:1.4fr repeat(4,1fr);align-items:center}
.fortapac .spec-grid>*{min-height:122px;display:flex;flex-direction:column;justify-content:center;padding:0 2rem;border-left:1px solid rgba(222,91,38,.55)}
.fortapac .spec-grid>*:first-child{border-left:none;padding-left:0}
.fortapac .spec-card{text-align:center}
.fortapac .spec-card svg{width:34px;height:34px;margin:0 auto 1rem;color:#fff}
.fortapac .spec-value{font-size:1.55rem;font-family:"IBM Plex Mono",monospace}

.fortapac .industries{background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.fortapac .industry-layout{display:grid;grid-template-columns:230px 1fr;gap:2rem;align-items:end}
.fortapac .industry-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem}
.fortapac .placeholder-image{background:linear-gradient(135deg,rgba(16,42,67,.08),rgba(16,42,67,.18)), var(--cloud);display:grid;place-items:center;aspect-ratio:1.1/1;color:var(--navy);border:1px solid var(--line);font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem;font-weight:600}
.fortapac .industry-card h3{margin-top:.75rem;font-size:1rem}

.fortapac .material{padding:0;background:#fff}
.fortapac .material-grid{display:grid;grid-template-columns:1.1fr 1.5fr;min-height:430px;border-bottom:1px solid var(--line)}
.fortapac .placeholder-fill{background:linear-gradient(135deg,rgba(16,42,67,.08),rgba(16,42,67,.18)), var(--cloud);display:grid;place-items:center;color:var(--navy);font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.16em;font-size:.72rem;font-weight:600;min-height:430px}
.fortapac .placeholder-fill .tag{padding:.55rem .9rem;border:1px solid rgba(16,42,67,.22)}
.fortapac .material-copy{padding:clamp(3rem,6vw,6rem);display:grid;grid-template-columns:1fr 230px;gap:4rem;align-content:center}
.fortapac .weave-diagram svg{width:100%;height:auto}

.fortapac .sustainability{background:var(--paper);padding:0}
.fortapac .sustainability-grid{display:grid;grid-template-columns:1fr repeat(3,1fr) .9fr;border-bottom:1px solid var(--line)}
.fortapac .sustainability-grid>div{padding:3rem 2rem;border-right:1px solid var(--line);background:rgba(255,255,255,.32)}
.fortapac .sustainability-grid>div:first-child{background:var(--paper)}
.fortapac .sustainability-grid>div:last-child{padding:0;border-right:none;background:none}
.fortapac .sustainability-grid>div:last-child .placeholder-fill{min-height:100%;height:100%}
.fortapac .sustainability svg{width:48px;height:48px;color:var(--forest);margin-bottom:1.1rem}
.fortapac .sustainability h3{color:var(--forest);font-size:1rem;margin-bottom:.5rem}

.fortapac .cta{padding:50px 0;background:linear-gradient(110deg,var(--deep),var(--navy));color:#fff}
.fortapac .cta-inner{display:grid;grid-template-columns:240px 1fr auto;gap:3rem;align-items:center}
.fortapac .woven-lines{height:98px;opacity:.55;background:repeating-linear-gradient(90deg,transparent 0 23px,rgba(255,255,255,.32) 23px 25px),repeating-linear-gradient(0deg,transparent 0 23px,rgba(255,255,255,.22) 23px 25px);position:relative}
.fortapac .woven-lines::after{content:"";position:absolute;left:8%;right:8%;top:50%;height:4px;background:var(--orange);transform:translateY(-50%)}

.fortapac .footer{background:#fff;padding:56px 0 0;color:var(--navy)}
.fortapac .footer-grid{display:grid;grid-template-columns:1.7fr repeat(4,1fr) 1.4fr;gap:2rem;padding-bottom:44px}
.fortapac .footer .brand{color:var(--navy);margin-bottom:1rem}
.fortapac .footer h4{margin:0 0 1rem;font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem}
.fortapac .footer a,.fortapac .footer p{color:rgba(16,42,67,.7);font-size:.9rem;display:block;margin-bottom:.55rem}
.fortapac .newsletter{display:flex;border:1px solid rgba(16,42,67,.35);height:46px;margin-top:1rem;border-radius:6px;overflow:hidden}
.fortapac .newsletter input{flex:1;min-width:0;border:none;padding:0 1rem;font:inherit;background:transparent}
.fortapac .newsletter button{width:52px;border:none;background:transparent;color:var(--navy);font-size:1.25rem;cursor:pointer}
.fortapac .copyright{background:var(--navy);color:rgba(255,255,255,.72);padding:18px 0;font-size:.8rem}
.fortapac .copyright .wrap{display:flex;justify-content:space-between;gap:1rem}
.fortapac .copyright a{display:inline-block;margin-left:1.5rem;color:rgba(255,255,255,.72)}

@media (max-width: 980px) {
  .fortapac .nav,.fortapac .header-cta,.fortapac .mega{display:none}
  .fortapac .menu-button{display:block}
  .fortapac .hero-wrap{width:calc(100% - 40px)}
  .fortapac .hero::before{background:linear-gradient(0deg, rgba(6,27,45,.96) 0%, rgba(6,27,45,.78) 45%, rgba(6,27,45,.24) 100%)}
  .fortapac .hero-placeholder{inset:0;left:0;top:0;height:42%;border-left:none;border-bottom:1px dashed rgba(255,255,255,.22)}
  .fortapac .hero-shell{align-items:flex-end}
  .fortapac .hero-content{padding:320px 0 54px;max-width:560px}
  .fortapac .products-grid{grid-template-columns:repeat(2,1fr)}
  .fortapac .spec-grid{grid-template-columns:repeat(2,1fr)}
  .fortapac .spec-grid>*{border-left:none;border-top:1px solid rgba(222,91,38,.45)}
  .fortapac .spec-grid>*:first-child{grid-column:1/-1;border-top:none;padding-left:2rem}
  .fortapac .industry-layout,.fortapac .material-grid,.fortapac .material-copy,.fortapac .sustainability-grid,.fortapac .cta-inner,.fortapac .footer-grid{grid-template-columns:1fr}
  .fortapac .industry-grid{grid-template-columns:repeat(2,1fr)}
  .fortapac .sustainability-grid>div{border-right:none;border-bottom:1px solid var(--line)}
  .fortapac .placeholder-fill{min-height:260px}
}

@media (max-width: 560px) {
  .fortapac .wrap,.fortapac .hero-wrap{width:calc(100% - 28px)}
  .fortapac .header-inner{height:70px}
  .fortapac .brand{width:178px}
  .fortapac h1{font-size:4.1rem}
  .fortapac h2{font-size:2.15rem}
  .fortapac section{padding:56px 0}
  .fortapac .hero{min-height:760px}
  .fortapac .hero-shell{min-height:760px;align-items:flex-start}
  .fortapac .hero-content{padding:360px 0 48px;max-width:100%}
  .fortapac .hero-actions{display:grid;grid-template-columns:1fr}
  .fortapac .section-head{flex-direction:column;align-items:start}
  .fortapac .products-grid,.fortapac .industry-grid,.fortapac .spec-grid{grid-template-columns:1fr}
  .fortapac .spec-grid>*:first-child{padding-left:0}
  .fortapac .spec-grid>*{padding:2rem 0}
  .fortapac .copyright .wrap{flex-direction:column}
  .fortapac .copyright a{margin-left:0;margin-right:1rem}
}
`;

const html = `
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
        <div class="made-in mono"><span class="flag"></span> Engineered in Sweden</div>
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

<footer class="footer">
  <div class="wrap footer-grid">
    <div>
      <a class="brand" href="#" style="color:var(--navy)"><svg viewBox="0 0 212 44" xmlns="http://www.w3.org/2000/svg" aria-label="Fortapac logo">
        <g stroke-linecap="round" stroke-width="4.8">
          <path d="M12 8V36" stroke="currentColor"/><path d="M22 8V36" stroke="currentColor"/><path d="M32 8V36" stroke="currentColor"/>
          <path d="M5 13H39" stroke="currentColor"/><path d="M5 23H39" stroke="#DE5B26"/><path d="M5 33H39" stroke="currentColor"/>
        </g>
        <text x="54" y="30" font-family="Arial Black, Archivo, sans-serif" font-size="24" letter-spacing="-1" fill="currentColor">FORTAPAC</text>
      </svg></a>
      <p>Woven polypropylene packaging engineered in Sweden for the weight of real work.</p>
      <div class="made-in mono" style="color:var(--navy);margin-top:1.5rem"><span class="flag"></span> Engineered in Sweden</div>
    </div>
    <div><h4>Products</h4><a href="#">FIBC Bulk Bags</a><a href="#">PP Woven Sacks</a><a href="#">Forestry Covers</a><a href="#">Covers &amp; Liners</a></div>
    <div><h4>Industries</h4><a href="#">Construction</a><a href="#">Agriculture</a><a href="#">Chemicals</a><a href="#">Forestry</a><a href="#">Logistics</a></div>
    <div><h4>Company</h4><a href="#">About Fortapac</a><a href="#">Sustainability</a><a href="#">Quality &amp; Standards</a><a href="#">Resources</a></div>
    <div><h4>Contact</h4><p>Fortapac AB</p><p>Göteborg, Sweden</p><a href="mailto:hello@fortapac.se">hello@fortapac.se</a></div>
    <div><h4>Newsletter</h4><p>Product updates, insights and sustainability news.</p><form class="newsletter" onsubmit="event.preventDefault()"><input type="email" placeholder="Your email"><button type="submit">→</button></form></div>
  </div>
  <div class="copyright"><div class="wrap"><span>© 2026 Fortapac AB. All rights reserved.</span><span><a href="#">Privacy Policy</a><a href="#">Terms of Use</a><a href="#">Cookie Settings</a></span></div></div>
</footer>
`;

const MEGA_PRODUCTS = [
  {
    slug: "fibc",
    name: "FIBC Bulk Bags",
    blurb: "500–2,000 kg SWL containers for dry, flowable products.",
    image: "/products/fibc-bulk-bags.png",
    specs: { swl: "1,000 KG", sf: "5:1", uv: "Stabilised", material: "PP" },
  },
  {
    slug: "sacks",
    name: "PP Woven Sacks",
    blurb: "Open-mouth, valve and leno sacks for grain, feed, chemicals and more.",
    image: "/products/pp-woven-sacks.png",
    specs: { swl: "10–100 KG", sf: "5:1", uv: "Optional", material: "PP" },
  },
  {
    slug: "forestry",
    name: "Forestry Covers",
    blurb: "UV-stabilised covers for timber and pulp protection.",
    image: "/products/forestry-covers.png",
    specs: { swl: "—", sf: "—", uv: "1,600 h", material: "PP" },
  },
  {
    slug: "covers",
    name: "Covers & Liners",
    blurb: "Tarpaulins, ground covers and container liners.",
    image: "/products/covers-liners.png",
    specs: { swl: "—", sf: "—", uv: "Stabilised", material: "PP / PE" },
  },
];

const ADDONS = [
  "Custom sizes available",
  "Printed logos",
  "UV options",
  "Liners & coatings",
  "Technical support",
];

const FortapacMark = () => (
  <svg viewBox="0 0 212 44" xmlns="http://www.w3.org/2000/svg" aria-label="Fortapac logo">
    <g strokeLinecap="round" strokeWidth="4.8">
      <path d="M12 8V36" stroke="currentColor" />
      <path d="M22 8V36" stroke="currentColor" />
      <path d="M32 8V36" stroke="currentColor" />
      <path d="M5 13H39" stroke="currentColor" />
      <path d="M5 23H39" stroke="#DE5B26" />
      <path d="M5 33H39" stroke="currentColor" />
    </g>
    <text x="54" y="30" fontFamily="Arial Black, Archivo, sans-serif" fontSize="24" letterSpacing="-1" fill="currentColor">
      FORTAPAC
    </text>
  </svg>
);

function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMegaOpen(false);
    }
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, []);

  const active = MEGA_PRODUCTS[activeIdx];

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="#"><FortapacMark /></a>
        <nav className="nav">
          <div
            className={`mega-wrap ${megaOpen ? "open" : ""}`}
            ref={wrapRef}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              className="mega-trigger-btn"
              aria-haspopup="true"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen((o) => !o)}
            >
              Products <span className="chev" aria-hidden="true">▾</span>
            </button>
            {megaOpen && (
              <div className="mega" role="menu">
                <div className="mega-grid">
                  <div className="mega-intro">
                    <div className="eyebrow mono">Products</div>
                    <h3>Woven packaging for load, storage and transport.</h3>
                    <div className="rule" />
                    <p>Manufactured at our parent factory. Specified, stocked and supported from Sweden.</p>
                    <a className="button light" href="#products">
                      View all products <span className="arrow">→</span>
                    </a>
                  </div>
                  <div className="mega-list">
                    {MEGA_PRODUCTS.map((p, i) => (
                      <button
                        key={p.slug}
                        type="button"
                        className={`mega-item ${i === activeIdx ? "active" : ""}`}
                        onMouseEnter={() => setActiveIdx(i)}
                        onFocus={() => setActiveIdx(i)}
                        onClick={() => {
                          setMegaOpen(false);
                          const el = document.getElementById("products");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <div className="mega-icon">
                          <img src={p.image} alt="" />
                        </div>
                        <div>
                          <h4>{p.name}</h4>
                          <p>{p.blurb}</p>
                        </div>
                        <div className="arrow" aria-hidden="true">→</div>
                      </button>
                    ))}
                  </div>
                  <div className="mega-showcase">
                    <div className="mega-photo">
                      <div className="tag">Product photo · {active.name}</div>
                    </div>
                    <div className="mega-specs">
                      <div>
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 22h28l5 32H13l5-32Z" />
                            <path d="M24 22a8 8 0 0 1 16 0" />
                          </g>
                        </svg>
                        <span className="label">SWL</span>
                        <span className="val">{active.specs.swl}</span>
                      </div>
                      <div>
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M32 8l20 8v13c0 13-8 22-20 27-12-5-20-14-20-27V16l20-8Z" />
                            <path d="m23 31 6 6 13-15" />
                          </g>
                        </svg>
                        <span className="label">Safety factor</span>
                        <span className="val">{active.specs.sf}</span>
                      </div>
                      <div>
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="32" cy="32" r="9" />
                            <path d="M32 7v8M32 49v8M7 32h8M49 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" />
                          </g>
                        </svg>
                        <span className="label">UV</span>
                        <span className="val">{active.specs.uv}</span>
                      </div>
                      <div>
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M25 14l7-7 7 7" />
                            <path d="M32 7v17" />
                            <path d="M47 37l3 10-10 3" />
                            <path d="M50 47 36 39" />
                            <path d="M17 50 7 47l3-10" />
                            <path d="M7 47l14-8" />
                          </g>
                        </svg>
                        <span className="label">Material</span>
                        <span className="val">{active.specs.material}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mega-addons">
                  {ADDONS.map((a, i) => (
                    <span key={a}>
                      {a}
                      {i < ADDONS.length - 1 && <em className="dot">•</em>}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="#industries">Industries</a>
          <a href="#materials">Materials</a>
          <a href="#sustainability">Sustainability</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="button primary header-cta" href="#contact">
          Get a quote <span className="arrow">→</span>
        </a>
        <button className="menu-button" aria-label="Open menu">☰</button>
      </div>
    </header>
  );
}

function Index() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="fortapac">
        <Header />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}
