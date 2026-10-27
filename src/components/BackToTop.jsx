import { ChevronUp } from "lucide-react";
import { scrollToSection } from "../utils/scroll.js";

export default function BackToTop({ visible }) {
  return (
    <button type="button" className={`back-to-top ${visible ? "is-visible" : ""}`} onClick={() => scrollToSection("home")} aria-label="Back to top" tabIndex={visible ? 0 : -1}>
      <ChevronUp size={20} aria-hidden="true" />
    </button>
  );
}
