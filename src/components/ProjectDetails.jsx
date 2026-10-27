import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import { useDialog } from "../hooks/useDialog.js";
import { GithubIcon } from "./icons.jsx";
import ProjectVisual from "./ProjectVisual.jsx";

function Block({ title, children }) {
  return (<section className="detail-block"><h3>{title}</h3>{children}</section>);
}
const List = ({ items }) => <ul className="detail-list">{items.map((i) => <li key={i}>{i}</li>)}</ul>;

function Panel({ project, onClose }) {
  const ref = useDialog(true, onClose);
  const reduce = useReducedMotion();
  const has = (v) => (Array.isArray(v) ? v.length > 0 : !!v);

  return (
    <motion.div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }}>
      <motion.div ref={ref} className="modal" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" tabIndex={-1} initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: 20 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
        <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Close project details" data-autofocus><X size={20} aria-hidden="true" /></button>
        <div className="modal-media"><ProjectVisual project={project} eager /></div>
        <div className="modal-content">
          <p className="project-meta">{[project.kind, project.year, project.status].filter(Boolean).join(" · ")}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          {project.fullDescription && <p className="lead">{project.fullDescription}</p>}
          <div className="modal-links">
            {project.githubUrl && <a className="btn btn-outline btn-sm" href={project.githubUrl} target="_blank" rel="noopener noreferrer"><GithubIcon size={16} /> View code</a>}
            {project.liveUrl && <a className="btn btn-primary btn-sm" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} aria-hidden="true" /> Live demo</a>}
          </div>
          {has(project.problem) && <Block title="Problem"><p>{project.problem}</p></Block>}
          {has(project.solution) && <Block title="Solution"><p>{project.solution}</p></Block>}
          {has(project.role) && <Block title="My contribution"><p>{project.role}</p></Block>}
          {has(project.technologies) && <Block title="Technologies"><ul className="badges">{project.technologies.map((t) => <li key={t} className="badge">{t}</li>)}</ul></Block>}
          {has(project.features) && <Block title="Features"><List items={project.features} /></Block>}
          {has(project.technicalDecisions) && <Block title="Technical decisions"><List items={project.technicalDecisions} /></Block>}
          {has(project.challenges) && (
            <Block title="Challenges and solutions">
              <ul className="detail-list">{project.challenges.map((c) => <li key={c.challenge}><strong>{c.challenge}</strong> {c.solution}</li>)}</ul>
            </Block>
          )}
          {has(project.gallery) && (
            <Block title="Gallery"><div className="gallery">{project.gallery.map((g) => <img key={g.src} src={g.src} alt={g.alt || `${project.title} screenshot`} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = "none"; }} />)}</div></Block>
          )}
          {has(project.learnings) && <Block title="Results and learnings"><List items={project.learnings} /></Block>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectDetails({ project, onClose }) {
  return <AnimatePresence>{project && <Panel key={project.id} project={project} onClose={onClose} />}</AnimatePresence>;
}
