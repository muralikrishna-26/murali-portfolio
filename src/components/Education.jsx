import { education } from "../data/timeline.js";
import SectionHeading from "./SectionHeading.jsx";
import Timeline from "./Timeline.jsx";

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container narrow">
        <SectionHeading eyebrow="Education" title="Academic background" id="education-title" />
        <Timeline items={education} label="Education timeline" />
      </div>
    </section>
  );
}
