import { motion, useReducedMotion } from "motion/react";
import { navLinks, profile } from "../data/profile.js";
import { scrollToSection } from "../utils/scroll.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";

export default function Footer() {
  const reduce = useReducedMotion();
  return (
    <footer className="footer">
      <motion.div className="container footer-inner" initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="footer-title">{profile.title}</p>
          <div className="footer-social">
            <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><GithubIcon size={18} /></a>
            <a className="icon-btn" href={`https://${profile.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><LinkedinIcon size={18} /></a>
          </div>
        </div>
        <nav aria-label="Footer navigation"><ul className="footer-nav">
          {navLinks.map((l) => (<li key={l.id}><a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(l.id); }}>{l.label}</a></li>))}
        </ul></nav>
      </motion.div>
      <p className="copyright">&copy; {new Date().getFullYear()} {profile.name}. Built with React and Vite.</p>
    </footer>
  );
}
