"use client";

import { useEffect, useState } from "react";

function readPreference() {
  if (typeof window === "undefined") return false;
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion() {
  // Lazy init reads the real value on the client's first render — this
  // never affects rendered markup, so there's nothing for hydration to
  // mismatch on, and no need to correct it from an effect afterward.
  const [reduced, setReduced] = useState(readPreference);

  useEffect(() => {
    const mql = matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
