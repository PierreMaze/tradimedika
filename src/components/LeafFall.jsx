import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GiFallingLeaf } from "react-icons/gi";
import { useTheme } from "../context/ThemeContext";

export default function LeafFall() {
  const { isDarkMode } = useTheme();
  const [show, setShow] = useState(false);
  
  // Détection mobile vs desktop
  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 5 : 10;
  const START_FALL_AFTER = 2000;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), START_FALL_AFTER);
    return () => clearTimeout(timer);
  }, []);

  const leaves = useMemo(() => {
    return Array.from({ length: COUNT }).map((_, i) => {
      const startX = (i + 0.5) * (100 / COUNT);
      const startY = -10;
      const scale = 1;
      const duration = Math.random() * 12 + 16;
      const amplitude = Math.random() * 80 + 60;
      const rotationStart = Math.random() * 360;
      // Délai progressif pour que les feuilles tombent les unes après les autres
      const delay = i * 2.5 + Math.random() * 1;
      
      const KEYFRAMES_COUNT = 10;
      
      // Mouvement sinusoïdal continu - phase aléatoire pour éviter de commencer à 0
      const phaseOffset = Math.random() * Math.PI * 2;
      const xOffsets = Array.from({ length: KEYFRAMES_COUNT + 1 }).map(
        (_, index) => {
          const progress = index / KEYFRAMES_COUNT;
          // Assurons-nous que la feuille commence déjà en mouvement
          return amplitude * Math.sin(progress * Math.PI * 6 + phaseOffset + Math.PI / 4);
        }
      );
      
      // Rotation qui suit le mouvement horizontal
      const rotateKeyframes = Array.from({ length: KEYFRAMES_COUNT + 1 }).map(
        (_, index) => {
          const progress = index / KEYFRAMES_COUNT;
          const xVelocity = Math.cos(progress * Math.PI * 6 + phaseOffset + Math.PI / 4);
          return rotationStart + xVelocity * 60;
        }
      );
      
      // Animation jusqu'à 110vh pour disparition complète
      const yKeyframes = Array.from({ length: KEYFRAMES_COUNT + 1 }).map(
        (_, index) => `${(index / KEYFRAMES_COUNT) * 110}vh`,
      );
      
      // Opacité réduite et disparition progressive
      const opacityKeyframes = Array.from({ length: KEYFRAMES_COUNT + 1 }).map(
        (_, index) => {
          const progress = index / KEYFRAMES_COUNT;
          if (progress < 0.7) return 0.7;
          return 0.7 * (1 - (progress - 0.7) / 0.3);
        }
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
  }, [COUNT]);

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ 
            left: `${leaf.startX}%`, 
            top: `${leaf.startY}%`,
            willChange: 'transform, opacity'
          }}
          initial={{
            y: 0,
            x: leaf.xOffsets[0],
            scale: leaf.scale,
            rotate: leaf.rotateKeyframes[0],
            opacity: 0,
          }}
          animate={{
            y: leaf.yKeyframes,
            x: leaf.xOffsets,
            rotate: leaf.rotateKeyframes,
            opacity: leaf.opacityKeyframes,
          }}
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
            className={"text-accent"}
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
          />
        </motion.div>
      ))}
    </div>
  );
}