export function getCategories(projects) {
  return ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
}

export function filterProjects(projects, { category = "All", query = "" }) {
  const q = query.trim().toLowerCase();
  return projects
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => !q || p.title.toLowerCase().includes(q) || (p.technologies || []).some((t) => t.toLowerCase().includes(q)))
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
