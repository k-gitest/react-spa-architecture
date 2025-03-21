import { useState, useEffect } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    };

    media.addEventListener("change", handleChange)

    return () => {
      media.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

export default useMediaQuery