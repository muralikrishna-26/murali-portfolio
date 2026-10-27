import { motion, useReducedMotion } from "motion/react";

// Fade-and-rise entrance when scrolled into view. Skipped for reduced motion.
export default function Reveal({ children, delay = 0, as = "div", className = "", ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) { const Plain = as; return <Plain className={className} {...rest}>{children}</Plain>; }
  return (
    <Tag className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} {...rest}>
      {children}
    </Tag>
  );
}
