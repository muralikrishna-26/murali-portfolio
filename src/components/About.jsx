import { profile } from "../data/profile.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading eyebrow="About" title="Frontend developer focused on clean, responsive React interfaces" id="about-title" />
        <div className="bento">
          <Reveal className="card bento-main">
            <p>{profile.summary}</p>
            <p>My focus is frontend development: building responsive interfaces and reusable React components, and keeping code readable so it stays easy to maintain.</p>
          </Reveal>
          <Reveal className="card bento-approach" delay={0.08}>
            <h3>My approach</h3>
            <ul className="approach-list">
              {profile.approach.map((a) => (<li key={a.title}><strong>{a.title}</strong><span>{a.text}</span></li>))}
            </ul>
          </Reveal>
          {profile.highlights.map((h, i) => (
            <Reveal key={h.label} className="card stat" delay={0.12 + i * 0.05}>
              <span className="stat-label">{h.label}</span><span className="stat-value">{h.value}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
