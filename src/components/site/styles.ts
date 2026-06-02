export const SITE_CSS = `
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
.fortapac .header-right{display:flex;align-items:center;gap:1.5rem}
.fortapac .lang-switch{display:inline-flex;align-items:center;gap:.35rem;font-family:"IBM Plex Mono",monospace;font-size:.72rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);padding:.4rem .65rem;border:1px solid rgba(255,255,255,.18);border-radius:4px;transition:.15s}
.fortapac .lang-switch:hover{border-color:rgba(255,255,255,.35);color:rgba(255,255,255,.85)}
.fortapac .lang-switch .on{color:#fff}
.fortapac .lang-switch .sep{color:rgba(255,255,255,.3);font-weight:400}

.fortapac .mega{position:fixed;left:0;right:0;top:78px;background:#F9F9F9;color:var(--ink);box-shadow:0 30px 60px -20px rgba(6,27,45,.45);z-index:20;border-top:1px solid rgba(255,255,255,.12)}
.fortapac .mega-grid{display:grid;grid-template-columns:1fr 1.45fr 1.55fr;min-height:560px}
.fortapac .mega-intro{padding:3rem 2.5rem;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:1.25rem;background:#F9F9F9}
.fortapac .mega-intro h3{font-family:"Archivo",Arial,sans-serif;font-size:1.7rem;font-weight:900;line-height:1.05;letter-spacing:-.035em;margin:0;color:var(--navy)}
.fortapac .mega-intro .rule{width:64px;height:3px;background:var(--orange)}
.fortapac .mega-intro p{margin:0;color:rgba(11,27,45,.7);font-size:.95rem;max-width:300px}
.fortapac .mega-intro .button{align-self:flex-start;margin-top:auto}
.fortapac .mega-list{display:flex;flex-direction:column;background:#F9F9F9;border-right:1px solid var(--line)}
.fortapac .mega-item{display:grid;grid-template-columns:72px 1fr 24px;gap:1rem;align-items:center;padding:1.1rem 1.75rem;border-bottom:1px solid var(--line);position:relative;transition:background .15s;cursor:pointer;text-align:left;background:transparent;border-left:none;border-right:none;border-top:none;width:100%;font-family:inherit;color:inherit}
.fortapac .mega-item:last-child{border-bottom:none}
.fortapac .mega-item.active{background:#fff}
.fortapac .mega-item.active::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--orange)}
.fortapac .mega-icon{display:grid;place-items:center;width:56px;height:56px;color:var(--navy)}
.fortapac .mega-icon img{width:56px;height:56px;object-fit:contain;mix-blend-mode:multiply}
.fortapac .mega-icon svg{width:48px;height:48px}
.fortapac .mega-item h4{font-family:"Archivo",Arial,sans-serif;font-size:.95rem;font-weight:800;letter-spacing:.01em;margin:0 0 .25rem;text-transform:uppercase;color:var(--navy)}
.fortapac .mega-item p{margin:0;font-size:.82rem;color:rgba(11,27,45,.65);line-height:1.4}
.fortapac .mega-item .arrow{color:var(--orange);font-size:1.1rem;justify-self:end}
.fortapac .mega-showcase{background:var(--deep);color:#fff;display:flex;flex-direction:column;padding:1.75rem;gap:1.25rem}
.fortapac .mega-photo{aspect-ratio:16/9;display:grid;place-items:center;border:1px dashed rgba(255,255,255,.2);font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.16em;font-size:.7rem;color:rgba(255,255,255,.5);background:linear-gradient(135deg,rgba(255,255,255,.03),rgba(255,255,255,.08));overflow:hidden;position:relative;border-radius:2px}
.fortapac .mega-photo .tag{padding:.5rem .85rem;border:1px solid rgba(255,255,255,.2);text-align:center;max-width:80%}
.fortapac .mega-focus-meta{display:flex;flex-direction:column;gap:.55rem}
.fortapac .mega-focus-meta .focus-badge{display:inline-block;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:rgba(255,255,255,.9);padding:.35rem .7rem;font-size:.62rem;align-self:flex-start;border-radius:2px}
.fortapac .mega-focus-meta .focus-title{font-family:"Archivo",Arial,sans-serif;font-size:1.55rem;font-weight:900;letter-spacing:-.025em;line-height:1.05;color:#fff;margin:.15rem 0 0}
.fortapac .mega-focus-meta .focus-blurb{margin:0;color:rgba(255,255,255,.82);font-size:.92rem;line-height:1.5;max-width:46ch}
.fortapac .mega-focus-meta .focus-link{display:inline-flex;align-items:center;gap:.5rem;color:var(--orange);font-size:.72rem;align-self:flex-start;margin-top:.25rem}
.fortapac .mega-focus-meta .focus-link:hover{filter:brightness(1.15)}
.fortapac .mega-specs{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.1);padding-top:1.25rem;margin-top:auto}
.fortapac .mega-specs > div{display:flex;flex-direction:column;align-items:center;text-align:center;gap:.3rem;padding:.25rem .5rem;border-right:1px solid rgba(255,255,255,.08)}
.fortapac .mega-specs > div:last-child{border-right:none}
.fortapac .mega-specs .label{font-family:"IBM Plex Mono",monospace;text-transform:uppercase;letter-spacing:.1em;font-size:.6rem;color:rgba(255,255,255,.6);line-height:1.2}
.fortapac .mega-specs .val{font-family:"IBM Plex Mono",monospace;font-size:1rem;font-weight:600;color:#fff;line-height:1.1}
.fortapac .mega-addons{display:grid;grid-template-columns:repeat(5,1fr);background:#fff;border-top:1px solid var(--line);padding:1.1rem 2rem}
.fortapac .mega-addons .addon-item{display:flex;align-items:center;gap:.85rem;padding:.25rem .75rem;border-right:1px solid var(--line)}
.fortapac .mega-addons .addon-item:last-child{border-right:none}
.fortapac .mega-addons .addon-icon{flex:none;width:34px;height:34px;display:grid;place-items:center;color:var(--orange)}
.fortapac .mega-addons .addon-icon svg{width:28px;height:28px}
.fortapac .mega-addons .addon-icon img{width:28px;height:28px;object-fit:contain}
.fortapac .mega-addons .addon-title{display:block;font-family:"Archivo",Arial,sans-serif;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--navy);line-height:1.2}
.fortapac .mega-addons .addon-sub{display:block;font-size:.74rem;color:rgba(11,27,45,.6);line-height:1.3;margin-top:.15rem}

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

.fortapac .about-hero{background:linear-gradient(110deg,var(--deep),var(--navy));color:#fff;padding:120px 0 100px;position:relative;overflow:hidden}
.fortapac .about-hero::before{content:"";position:absolute;inset:0;opacity:.18;background:repeating-linear-gradient(90deg,transparent 0 23px,rgba(255,255,255,.4) 23px 25px),repeating-linear-gradient(0deg,transparent 0 23px,rgba(255,255,255,.25) 23px 25px);pointer-events:none}
.fortapac .about-hero .wrap{position:relative;z-index:1}
.fortapac .about-hero h1{font-size:clamp(3rem,6vw,5.5rem);max-width:18ch;color:#fff;letter-spacing:-.04em}
.fortapac .about-hero h1 span{color:var(--orange)}
.fortapac .about-hero p{max-width:680px;color:rgba(255,255,255,.86);font-size:clamp(1.1rem,1.5vw,1.3rem);margin:1.75rem 0 0;line-height:1.55}
.fortapac .about-pillars-section{padding:88px 0;background:#fff;border-bottom:1px solid var(--line)}
.fortapac .about-pillars-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:2.5rem}
.fortapac .about-pillar{background:var(--paper);padding:2.5rem;border:1px solid var(--line);display:flex;flex-direction:column;gap:.85rem}
.fortapac .about-pillar .num{font-family:"IBM Plex Mono",monospace;font-size:.7rem;color:var(--orange);letter-spacing:.16em;text-transform:uppercase}
.fortapac .about-pillar h3{font-size:1.35rem}
.fortapac .about-pillar p{color:rgba(11,27,45,.72);margin:0;font-size:.95rem;line-height:1.6}
.fortapac .about-story{padding:100px 0;background:var(--paper)}
.fortapac .about-story-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:5rem;align-items:start}
.fortapac .about-story-grid h2{font-size:clamp(2rem,3.5vw,3rem);max-width:14ch}
.fortapac .about-story-grid .rule{width:64px;height:3px;background:var(--orange);margin-top:1.5rem}
.fortapac .about-story-grid p{color:rgba(11,27,45,.78);font-size:1.05rem;line-height:1.7;margin:0 0 1.25rem}
.fortapac .about-story-grid p:last-of-type{margin-bottom:0}
.fortapac .about-story-grid p strong{color:var(--navy);font-weight:700}

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
  .fortapac .about-pillars-grid,.fortapac .about-story-grid{grid-template-columns:1fr;gap:2.5rem}
  .fortapac .mega-grid{grid-template-columns:1fr}
  .fortapac .mega-addons{grid-template-columns:1fr 1fr}
  .fortapac .about-hero{padding:80px 0 70px}
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
  .fortapac .about-hero h1{font-size:2.6rem}
  .fortapac .about-pillar{padding:1.75rem}
}
`;
