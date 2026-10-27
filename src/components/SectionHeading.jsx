import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, children, id }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </Reveal>
  );
}
