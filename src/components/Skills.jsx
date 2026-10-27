import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { skillCategories, skills } from "../data/skills.js";
import SectionHeading from "./SectionHeading.jsx";
import SkillIcon from "./SkillIcon.jsx";

export default function Skills() {
  const [category, setCategory] = useState("All");
  const reduce = useReducedMotion();
  const shown = category === "All" ? skills : skills.filter((s) => s.category === category);
  const tabs = ["All", ...skillCategories];

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading eyebrow="Skills" title="Technologies and concepts I work with" id="skills-title">Skills listed here come straight from my resume.</SectionHeading>
        <div className="chips" role="group" aria-label="Filter skills by category">
          {tabs.map((t) => (
            <button type="button" key={t} className={`chip-btn ${category === t ? "is-active" : ""}`} aria-pressed={category === t} onClick={() => setCategory(t)}>{t}</button>
          ))}
        </div>
        <ul className="skills-grid">
          <AnimatePresence mode="popLayout">
            {shown.map((s) => (
              <motion.li key={s.name} layout={!reduce} initial={reduce ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: 0.94 }} transition={{ duration: 0.25 }} className="card skill-card" tabIndex={0}>
                <span className="skill-icon"><SkillIcon name={s.icon} /></span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <span className="skill-cat">{s.category}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
