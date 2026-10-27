import { useState } from "react";
import { Download, Menu, Search, X } from "lucide-react";
import { navLinks, profile } from "../data/profile.js";
import { scrollToSection } from "../utils/scroll.js";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar({ active, scrolled, theme, onToggleTheme, onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const go = (id) => (e) => { e.preventDefault(); setOpen(false); scrollToSection(id); };
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <nav className="navbar-inner" aria-label="Main navigation">
        <a href="#home" className="logo" onClick={go("home")} aria-label={`${profile.name}, back to top`}>
          <span className="logo-mark">{profile.initials}</span>
          <span className="logo-text">{profile.firstName.split(" ")[0]}<span className="dot">.</span></span>
        </a>

        <ul id="nav-menu" className={`nav-links ${open ? "is-open" : ""}`}>
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={go(l.id)} className={active === l.id ? "is-active" : ""} aria-current={active === l.id ? "true" : undefined}>{l.label}</a>
            </li>
          ))}
          <li className="nav-resume-mobile">
            <a className="btn btn-primary" href={profile.resumeUrl} download>Download Resume</a>
          </li>
        </ul>

        <div className="nav-actions">
          <button type="button" className="icon-btn palette-btn" onClick={onOpenPalette} aria-label="Open command palette" title={`Command palette (${isMac ? "Cmd" : "Ctrl"}+K)`}>
            <Search size={18} aria-hidden="true" />
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a className="btn btn-outline btn-sm nav-resume" href={profile.resumeUrl} download>
            <Download size={16} aria-hidden="true" /> Resume
          </a>
          <button type="button" className="icon-btn nav-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="nav-menu" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
