import { useState } from "react";
import { Layers, ScanEye, LayoutDashboard } from "lucide-react";

// Shows the project's real screenshot, or an elegant category-based placeholder when none exists / fails to load.
const ICONS = { Frontend: LayoutDashboard, "Deep Learning": ScanEye };

export default function ProjectVisual({ project, eager = false }) {
  const [failed, setFailed] = useState(false);
  const Icon = ICONS[project.category] || Layers;
  const tone = project.category === "Deep Learning" ? "visual-cyan" : "visual-violet";

  if (project.image && !failed) {
    return <img className="project-img" src={project.image} alt={`Screenshot of ${project.title}`} loading={eager ? "eager" : "lazy"} decoding="async" width="800" height="500" onError={() => setFailed(true)} />;
  }
  return (
    <div className={`project-placeholder ${tone}`} role="img" aria-label={`${project.title} project illustration`}>
      <Icon size={44} aria-hidden="true" />
      <span>{project.category}</span>
    </div>
  );
}
