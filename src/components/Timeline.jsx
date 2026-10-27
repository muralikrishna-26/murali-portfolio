import { Award, Briefcase, FolderGit2, GraduationCap, Wrench } from "lucide-react";
import Reveal from "./Reveal.jsx";

const TYPE_ICON = { Employment: Briefcase, Internship: Briefcase, Project: FolderGit2, "Academic project": FolderGit2, Workshop: Wrench, Achievement: Award, Education: GraduationCap };

export default function Timeline({ items, label }) {
  return (
    <ol className="timeline" aria-label={label}>
      {items.map((it, i) => {
        const Icon = TYPE_ICON[it.type || "Education"] || FolderGit2;
        return (
          <Reveal as="li" key={it.id} className="timeline-item" delay={i * 0.05}>
            <span className="timeline-dot"><Icon size={16} aria-hidden="true" /></span>
            <div className="card timeline-card">
              <div className="timeline-top">
                <span className="badge">{it.type || "Education"}</span>
                {it.period && <time className="timeline-period">{it.period}</time>}
              </div>
              <h3>{it.title}</h3>
              {it.org && <p className="timeline-org">{it.org}</p>}
              {it.description && <p>{it.description}</p>}
              {it.score && <p className="timeline-score">Percentage: <strong>{it.score}</strong></p>}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
