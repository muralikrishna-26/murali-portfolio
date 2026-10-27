import { useRef } from "react";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { useFinePointer } from "../hooks/useFinePointer.js";
import { GithubIcon } from "./icons.jsx";
import ProjectVisual from "./ProjectVisual.jsx";

export default function ProjectCard({ project, onOpen }) {
  const ref = useRef(null);
  const fine = useFinePointer();

  const onMove = (e) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
    ref.current.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    ref.current.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  };
  const onLeave = () => { ref.current?.style.removeProperty("--rx"); ref.current?.style.removeProperty("--ry"); };

  return (
    <article ref={ref} className={`card project-card ${fine ? "is-fine" : ""}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="project-media">
        <ProjectVisual project={project} />
        {project.featured && <span className="badge badge-featured"><Star size={12} aria-hidden="true" /> Featured</span>}
      </div>
      <div className="project-body">
        <p className="project-meta">{[project.kind, project.year, project.status].filter(Boolean).join(" · ")}</p>
        <h3>{project.title}</h3>
        <p className="project-desc">{project.shortDescription}</p>
        {project.technologies?.length > 0 && (
          <ul className="badges" aria-label="Technologies used">{project.technologies.map((t) => <li key={t} className="badge">{t}</li>)}</ul>
        )}
        {project.features?.length > 0 && (
          <ul className="feature-list">{project.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}</ul>
        )}
        <div className="project-actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => onOpen(project)} aria-haspopup="dialog">View Details <ArrowUpRight size={16} aria-hidden="true" /></button>
          {project.githubUrl && <a className="btn btn-outline btn-sm" href={project.githubUrl} target="_blank" rel="noopener noreferrer"><GithubIcon size={16} /> GitHub</a>}
          {project.liveUrl && <a className="btn btn-outline btn-sm" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} aria-hidden="true" /> Live Demo</a>}
        </div>
      </div>
    </article>
  );
}
