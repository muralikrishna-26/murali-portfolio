import { experience } from "../data/timeline.js";
import SectionHeading from "./SectionHeading.jsx";
import Timeline from "./Timeline.jsx";

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container narrow">
        <SectionHeading eyebrow="Experience" title="Projects, workshops and achievements" id="experience-title">
          Each entry is labeled by type: academic projects, workshops and achievements are shown as what they are.
        </SectionHeading>
        <Timeline items={experience} label="Projects, workshops and achievements timeline" />
      </div>
    </section>
  );
}
