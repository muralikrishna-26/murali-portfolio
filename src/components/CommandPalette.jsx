import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search } from "lucide-react";
import { useDialog } from "../hooks/useDialog.js";

function Dialog({ commands, onClose }) {
  const ref = useDialog(true, onClose);
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const list = useMemo(() => commands.filter((c) => `${c.label} ${c.keywords || ""}`.toLowerCase().includes(query.trim().toLowerCase())), [commands, query]);
  const run = (c) => { onClose(); setTimeout(() => c.run(), 0); };

  useEffect(() => { document.getElementById(`cmd-${index}`)?.scrollIntoView({ block: "nearest" }); }, [index]);

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => (list.length ? (i + 1) % list.length : 0)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => (list.length ? (i - 1 + list.length) % list.length : 0)); }
    else if (e.key === "Enter" && list[index]) { e.preventDefault(); run(list[index]); }
  };

  return (
    <motion.div className="modal-backdrop palette-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.15 }}>
      <motion.div ref={ref} className="palette" role="dialog" aria-modal="true" aria-label="Command palette" tabIndex={-1} initial={reduce ? false : { opacity: 0, y: -16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
        <div className="palette-input">
          <Search size={18} aria-hidden="true" />
          <input data-autofocus type="text" role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-activedescendant={list[index] ? `cmd-${index}` : undefined} aria-label="Type a command" placeholder="Type a command or search..." value={query} onChange={(e) => { setQuery(e.target.value); setIndex(0); }} onKeyDown={onKey} />
          <kbd>Esc</kbd>
        </div>
        <ul id="cmd-list" role="listbox" aria-label="Commands" className="palette-list">
          {list.map((c, i) => (
            <li key={c.id} id={`cmd-${i}`} role="option" aria-selected={i === index} className={i === index ? "is-active" : ""} onMouseMove={() => setIndex(i)} onClick={() => run(c)}>
              {c.icon}<span>{c.label}</span>{c.hint && <small>{c.hint}</small>}
            </li>
          ))}
          {list.length === 0 && <li className="palette-empty" role="presentation">No matching commands</li>}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function CommandPalette({ open, onClose, commands }) {
  return <AnimatePresence>{open && <Dialog commands={commands} onClose={onClose} />}</AnimatePresence>;
}
