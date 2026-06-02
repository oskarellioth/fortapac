import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

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

export const FortapacMark = () => (
  <svg viewBox="0 0 212 44" xmlns="http://www.w3.org/2000/svg" aria-label="Fortapac logo">
    <g strokeLinecap="round" strokeWidth="4.8">
      <path d="M12 8V36" stroke="currentColor" />
      <path d="M22 8V36" stroke="currentColor" />
      <path d="M32 8V36" stroke="currentColor" />
      <path d="M5 13H39" stroke="currentColor" />
      <path d="M5 23H39" stroke="#DE5B26" />
      <path d="M5 33H39" stroke="currentColor" />
    </g>
    <text
      x="54"
      y="30"
      fontFamily="Arial Black, Archivo, sans-serif"
      fontSize="24"
      letterSpacing="-1"
      fill="currentColor"
    >
      FORTAPAC
    </text>
  </svg>
);

export function Header() {
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
        <Link to="/" className="brand">
          <FortapacMark />
        </Link>
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
              Products{" "}
              <span className="chev" aria-hidden="true">
                ▾
              </span>
            </button>
            {megaOpen && (
              <div className="mega" role="menu">
                <div className="mega-grid">
                  <div className="mega-intro">
                    <div className="eyebrow mono">Products</div>
                    <h3>Woven packaging for load, storage and transport.</h3>
                    <div className="rule" />
                    <p>Manufactured at our parent factory. Specified, stocked and supported from Sweden.</p>
                    <a className="button light" href="/#products">
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
                          window.location.href = "/#products";
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
          <a href="/#industries">Industries</a>
          <Link to="/about">About us</Link>
          <a href="/#sustainability">Sustainability</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="button primary header-cta" href="/#contact">
          Get a quote <span className="arrow">→</span>
        </a>
        <button className="menu-button" aria-label="Open menu">☰</button>
      </div>
    </header>
  );
}
