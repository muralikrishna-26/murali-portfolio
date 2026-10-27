import { Download, ExternalLink } from "lucide-react";
import { profile } from "../data/profile.js";
import { skills } from "../data/skills.js";
import { projects } from "../data/projects.js";
import { education } from "../data/timeline.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Resume() {
  return (
    <section id="resume" className="section" aria-labelledby="resume-title">
      <div className="container narrow">
        <SectionHeading eyebrow="Resume" title="One-page ATS-friendly resume" id="resume-title">A preview of my resume. The PDF has selectable text and a simple layout.</SectionHeading>
        <Reveal className="card resume-preview">
          <header>
            <h3>{profile.name}</h3>
            <p>{profile.title}</p>
          </header>
          <section><h4>Summary</h4><p>{profile.summary}</p></section>
          <section><h4>Skills</h4><p>{skills.map((s) => s.name).join(", ")}</p></section>
          <section><h4>Projects</h4>
            {projects.map((p) => (<p key={p.id}><strong>{p.title}</strong> ({p.year}) – {p.technologies.join(", ")}</p>))}
          </section>
          <section><h4>Education</h4>
            {education.map((e) => (<p key={e.id}><strong>{e.title}</strong>, {e.org} ({e.period}, {e.score})</p>))}
          </section>
        </Reveal>
        <div className="resume-actions">
          <a className="btn btn-primary" href={profile.resumeUrl} download="Murali-Krishna-Kummagiri-Resume.pdf"><Download size={18} aria-hidden="true" /> Download Resume PDF</a>
          <a className="btn btn-outline" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={18} aria-hidden="true" /> Open resume</a>
        </div>
      </div>
    </section>
  );
}
