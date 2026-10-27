import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "../data/profile.js";
import { scrollToSection } from "../utils/scroll.js";
import { GithubIcon, LinkedinIcon } from "./icons.jsx";

function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="portrait-frame">
      <div className="portrait-ring" aria-hidden="true" />
      <div className="portrait-glow" aria-hidden="true" />
      <div className="portrait-inner">
        {failed ? (
          <div className="portrait-fallback" role="img" aria-label={profile.photo.alt}>{profile.initials}</div>
        ) : (
          <picture>
            <source srcSet={profile.photo.webp} type="image/webp" />
            <img src={profile.photo.jpg} alt={profile.photo.alt} width="403" height="402" decoding="async" fetchPriority="high" onError={() => setFailed(true)} />
          </picture>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const words = profile.headline.split(" ");
  const fade = (delay) => (reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true"><span className="orb orb-a" /><span className="orb orb-b" /><span className="grid-lines" /></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.p className="hero-greeting" {...fade(0.05)}>Hi, I'm {profile.firstName}.</motion.p>
          <h1 id="hero-title" className="hero-title" aria-label={profile.headline}>
            {words.map((w, i) => (
              <span className="word-mask" key={i} aria-hidden="true">
                <motion.span className="word" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                  {i >= words.length - 3 ? <span className="gradient-text">{w}</span> : w}
                  {i < words.length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="hero-intro" {...fade(0.7)}>{profile.intro}</motion.p>
          {profile.availability && <motion.p className="availability" {...fade(0.75)}><span className="pulse-dot" aria-hidden="true" />{profile.availability}</motion.p>}
          <motion.div className="hero-ctas" {...fade(0.85)}>
            <a className="btn btn-primary" href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}>Explore My Projects <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="btn btn-outline" href={profile.resumeUrl} download><Download size={18} aria-hidden="true" /> Download Resume</a>
          </motion.div>
          <motion.div className="hero-links" {...fade(1)}>
            <a href={`mailto:${profile.email}`} className="text-link"><Mail size={18} aria-hidden="true" /> {profile.email}</a>
            <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)"><GithubIcon size={18} /></a>
            <a className="icon-btn" href={profile.linkedin.startsWith("http") ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><LinkedinIcon size={18} /></a>
          </motion.div>
        </div>

        <motion.div className="hero-portrait" initial={reduce ? false : { opacity: 0, x: 48, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <div className="float-wrap"><Portrait /></div>
          <span className="chip chip-a" aria-hidden="true">React.js</span>
          <span className="chip chip-b" aria-hidden="true">JavaScript</span>
        </motion.div>
      </div>
      <a href="#about" className="scroll-indicator" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} aria-label="Scroll to About section"><span>Scroll</span><ArrowDown size={16} aria-hidden="true" /></a>
    </section>
  );
}
