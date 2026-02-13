import { useEffect, useState } from "react";
import { GiFallingLeaf } from "react-icons/gi";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { usePerformance } from "../../../../features/settings";

export default function LeafFall() {
  const [show, setShow] = useState(false);
  const { isHighPerformance } = usePerformance();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const START_FALL_AFTER = 0;
  const COUNT = isMobile ? 3 : 5; // Dynamique : responsive au resize

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), START_FALL_AFTER);
    return () => clearTimeout(timer);
  }, []);

  // Initialiser les feuilles avec useState pour garantir la pureté
  // Génère plus de feuilles que nécessaire, filtrage au render pour responsivité
  const [leaves] = useState(() => {
    const MAX_LEAVES = 15; // Générer suffisamment pour tous les cas

    return Array.from({ length: MAX_LEAVES }).map(() => {
      const left = Math.random() * 100;
      const duration = Math.random() * 12 + 16;
      const delay = Math.random() * 8;
      const amplitude = Math.random() * 80 + 60;
      const rotationStart = Math.random() * 360;

      return {
        left,
        duration,
        delay,
        amplitude,
        rotationStart,
      };
    });
  });

  // Respecte le mode performance: désactive les animations en mode économie
  if (!show || !isHighPerformance) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      {leaves.slice(0, COUNT).map((leaf, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            top: "-20px",
            animation: `leaf-fall ${leaf.duration}s ease-in-out infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <GiFallingLeaf
            size={24}
            className="text-emerald-700/75 drop-shadow-lg dark:text-emerald-500/75"
          />
        </div>
      ))}
    </div>
  );
}
