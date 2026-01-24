import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GiFallingLeaf } from "react-icons/gi";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { usePerformance } from "../../../../features/settings";

export default function LeafFall() {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { isHighPerformance } = usePerformance();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const START_FALL_AFTER = 0;
  const COUNT = isMobile ? 3 : 5; // Dynamique : responsive au resize

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), START_FALL_AFTER);
    return () => clearTimeout(timer);
  }, []);

  // Page Visibility API - Pause animations when page is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Initialiser les feuilles avec useState pour garantir la pureté
  // Génère plus de feuilles que nécessaire, filtrage au render pour responsivité
  const [leaves] = useState(() => {
    const MAX_LEAVES = 15; // Générer suffisamment pour tous les cas

    return Array.from({ length: MAX_LEAVES }).map(() => {
      const startX = Math.random() * 100;
      const startY = -10;
      const scale = 1;
      const duration = Math.random() * 12 + 16;
      const amplitude = Math.random() * 80 + 60;
      const rotationStart = Math.random() * 360;
      // Délai aléatoire pour que les feuilles tombent de manière aléatoire
      const delay = Math.random() * 8;

      const KEYFRAMES_COUNT = 10;

      // Mouvement sinusoïdal continu - phase aléatoire pour éviter de commencer à 0
      const phaseOffset = Math.random() * Math.PI * 2;
      const xOffsets = Array.from({ length: KEYFRAMES_COUNT + 1 }).map(
        (_, index) => {
          const progress = index / KEYFRAMES_COUNT;
          // Assurons-nous que la feuille commence déjà en mouvement
          return (
            amplitude *
            Math.sin(progress * Math.PI * 6 + phaseOffset + Math.PI / 4)
          );
        },
      );

      // Rotation qui suit le mouvement horizontal
      const rotateKeyframes = Array.from({ length: KEYFRAMES_COUNT + 1 }).map(
        (_, index) => {
          const progress = index / KEYFRAMES_COUNT;
          const xVelocity = Math.cos(
            progress * Math.PI * 6 + phaseOffset + Math.PI / 4,
          );
          return rotationStart + xVelocity * 60;
        },
      );

      // Animation jusqu'à 110vh pour disparition complète
      const yKeyframes = Array.from({ length: KEYFRAMES_COUNT + 1 }).map(
        (_, index) => `${(index / KEYFRAMES_COUNT) * 100}vh`,
      );

      // Opacité réduite et disparition progressive et naturelle
      const opacityKeyframes = Array.from({ length: KEYFRAMES_COUNT + 1 }).map(
        (_, index) => {
          const progress = index / KEYFRAMES_COUNT;
          // Fade in rapide au début
          if (progress < 0.1) return progress * 7;
          // Opacité stable au milieu
          if (progress < 0.6) return 0.7;
          // Fade out progressif et smooth sur les 40% restants
          const fadeProgress = (progress - 0.6) / 0.4;
          // Utilisation d'une courbe ease-out pour un fondu plus naturel
          const easedFade = 1 - Math.pow(fadeProgress, 1.5);
          return 0.7 * easedFade;
        },
      );

      return {
        startX,
        startY,
        scale,
        duration,
        xOffsets,
        rotateKeyframes,
        yKeyframes,
        opacityKeyframes,
        delay,
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
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${leaf.startX}%`,
            top: `${leaf.startY}%`,
            // willChange supprimé pour réduire consommation GPU
          }}
          initial={{
            y: 0,
            x: leaf.xOffsets[0],
            scale: leaf.scale,
            rotate: leaf.rotateKeyframes[0],
            opacity: 0,
          }}
          animate={
            isVisible
              ? {
                  y: leaf.yKeyframes,
                  x: leaf.xOffsets,
                  rotate: leaf.rotateKeyframes,
                  opacity: leaf.opacityKeyframes,
                }
              : {} // Pause animation when page is hidden
          }
          transition={{
            duration: leaf.duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: leaf.delay,
          }}
        >
          <GiFallingLeaf
            size={24 * leaf.scale}
            className="text-emerald-700/75 drop-shadow-lg dark:text-emerald-500/75"
          />
        </motion.div>
      ))}
    </div>
  );
}
