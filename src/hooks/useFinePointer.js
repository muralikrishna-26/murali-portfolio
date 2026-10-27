import { useEffect, useState } from "react";

// True only for mouse-like devices with hover and when motion is allowed.
export function useFinePointer() {
  const query = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
  const [fine, setFine] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setFine(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine;
}
