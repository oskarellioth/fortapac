import { Link } from "@tanstack/react-router";
import { FortapacMark } from "./Header";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link to="/" className="brand" style={{ color: "var(--navy)" }}>
            <FortapacMark />
          </Link>
          <p>Woven polypropylene packaging — manufactured at our parent factory, stocked and supported in Sweden.</p>
          <div className="made-in mono" style={{ color: "var(--navy)", marginTop: "1.5rem" }}>
            <span className="flag"></span> Stocked &amp; supported in Sweden
          </div>
        </div>
        <div>
          <h4>Products</h4>
          <a href="/#products">FIBC Bulk Bags</a>
          <a href="/#products">PP Woven Sacks</a>
          <a href="/#products">Forestry Covers</a>
          <a href="/#products">Covers &amp; Liners</a>
        </div>
        <div>
          <h4>Industries</h4>
          <a href="/#industries">Construction</a>
          <a href="/#industries">Agriculture</a>
          <a href="/#industries">Chemicals</a>
          <a href="/#industries">Forestry</a>
          <a href="/#industries">Logistics</a>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About Fortapac</Link>
          <a href="/#sustainability">Sustainability</a>
          <a href="#">Quality &amp; Standards</a>
          <a href="#">Resources</a>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Fortapac AB</p>
          <p>Göteborg, Sweden</p>
          <a href="mailto:hello@fortapac.se">hello@fortapac.se</a>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Product updates, insights and sustainability news.</p>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" />
            <button type="submit">→</button>
          </form>
        </div>
      </div>
      <div className="copyright">
        <div className="wrap">
          <span>© 2026 Fortapac AB. All rights reserved.</span>
          <span>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Settings</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
