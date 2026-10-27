import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SquareTerminal, X } from "lucide-react";
import { profile } from "../data/profile.js";
import { skills } from "../data/skills.js";
import { projects } from "../data/projects.js";
import { scrollToSection } from "../utils/scroll.js";

// Safe, predefined commands only. Nothing typed here is ever evaluated or executed.
const HELP = ["help      list commands", "about     short introduction", "skills    list my skills", "projects  list my projects", "resume    go to the resume section", "contact   go to the contact section", "github    open my GitHub profile", "clear     clear the screen"];

export function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "": return { lines: [] };
    case "help": return { lines: HELP };
    case "about": return { lines: [`${profile.name} - ${profile.title}`, profile.intro], action: () => scrollToSection("about") };
    case "skills": return { lines: skills.map((s) => `- ${s.name} (${s.category})`), action: () => scrollToSection("skills") };
    case "projects": return { lines: projects.map((p) => `- ${p.title} (${p.year})`), action: () => scrollToSection("projects") };
    case "resume": return { lines: ["Opening the resume section. Use the Download button there for the PDF."], action: () => scrollToSection("resume") };
    case "contact": return { lines: [`Email: ${profile.email}`, "Opening the contact section."], action: () => scrollToSection("contact") };
    case "github": return { lines: [`Opening ${profile.github}`], action: () => window.open(profile.github, "_blank", "noopener,noreferrer") };
    case "clear": return { clear: true, lines: [] };
    default: return { lines: [`command not found: ${cmd.slice(0, 40)}. Type "help" to see the available commands.`] };
  }
}

export default function DeveloperTerminal({ open, onOpen, onClose }) {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState([{ t: "out", s: 'Welcome. Type "help" to see the available commands.' }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [lines, open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    const res = runCommand(value);
    if (value.trim()) setHistory((h) => [value, ...h]);
    setHIndex(-1);
    setLines((l) => (res.clear ? [] : [...l, { t: "in", s: value }, ...res.lines.map((s) => ({ t: "out", s }))]));
    setValue("");
    if (res.action) res.action();
  };
  const onKey = (e) => {
    if (e.key === "ArrowUp" && history.length) { e.preventDefault(); const i = Math.min(hIndex + 1, history.length - 1); setHIndex(i); setValue(history[i]); }
    else if (e.key === "ArrowDown") { e.preventDefault(); const i = hIndex - 1; setHIndex(i); setValue(i >= 0 ? history[i] : ""); }
  };

  return (
    <>
      {!open && <button type="button" className="terminal-fab" onClick={onOpen} aria-label="Open developer terminal"><SquareTerminal size={18} aria-hidden="true" /> <span>Terminal</span></button>}
      <AnimatePresence>
        {open && (
          <motion.section className="terminal" role="region" aria-label="Developer terminal" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: 20 }} transition={{ duration: 0.2 }}>
            <header className="terminal-bar"><span>developer@portfolio ~ </span><button type="button" className="icon-btn" onClick={onClose} aria-label="Close terminal"><X size={16} aria-hidden="true" /></button></header>
            <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()} aria-live="polite">
              {lines.map((l, i) => (<p key={i} className={l.t === "in" ? "t-in" : "t-out"}>{l.t === "in" ? `$ ${l.s}` : l.s}</p>))}
            </div>
            <form className="terminal-form" onSubmit={submit}>
              <label htmlFor="terminal-input" className="t-prompt">$</label>
              <input id="terminal-input" ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKey} autoComplete="off" autoCapitalize="off" spellCheck="false" aria-label="Terminal command" />
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
