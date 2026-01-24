import { useEffect, useRef, useState } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current && currentScrollY > 80) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection("up");
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // ✅ Dépendances vides - listener attaché une seule fois

  return scrollDirection;
}
