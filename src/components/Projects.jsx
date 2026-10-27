import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { projects } from "../data/projects.js";
import { filterProjects, getCategories } from "../utils/projectFilters.js";
import ProjectCard from "./ProjectCard.jsx";
import ProjectDetails from "./ProjectDetails.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const categories = useMemo(() => getCategories(projects), []);
  const results = useMemo(() => filterProjects(projects, { category, query }), [category, query]);
  const reset = () => { setCategory("All"); setQuery(""); };

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading eyebrow="Projects" title="Featured work" id="projects-title">Open a project to read its overview, contribution and technologies.</SectionHeading>
        <Reveal className="toolbar">
          <div className="chips" role="group" aria-label="Filter projects by category">
            {categories.map((c) => (<button type="button" key={c} className={`chip-btn ${category === c ? "is-active" : ""}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>))}
          </div>
          <label className="search">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search projects by title or technology</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or technology" />
          </label>
        </Reveal>
        <p className="sr-only" role="status" aria-live="polite">{results.length} {results.length === 1 ? "project" : "projects"} shown</p>
        {results.length > 0 ? (
          <div className="projects-grid">{results.map((p) => (<Reveal key={p.id}><ProjectCard project={p} onOpen={setSelected} /></Reveal>))}</div>
        ) : (
          <div className="empty-state card">
            <SearchX size={32} aria-hidden="true" />
            <h3>No projects match your search</h3>
            <p>Try a different keyword or clear the filters.</p>
            <button type="button" className="btn btn-outline btn-sm" onClick={reset}>Clear filters</button>
          </div>
        )}
      </div>
      <ProjectDetails project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
