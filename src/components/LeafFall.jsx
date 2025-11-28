// src/components/LeafFall.jsx
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GiFallingLeaf } from "react-icons/gi";
import { useTheme } from "../context/ThemeContext";

export default function LeafFall() {
  const { isDarkMode } = useTheme();
  const [show, setShow] = useState(false);

  const COUNT = 12;
  const EXPLODE_AFTER = 2000;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), EXPLODE_AFTER);
    return () => clearTimeout(timer);
  }, []);

  const leaves = useMemo(() => {
    return Array.from({ length: COUNT }).map((_, i) => {
      const startX = (i + 0.5) * (100 / COUNT);
      const startY = -10;
      const scale = Math.random() * 0.5 + 0.5;
      const duration = Math.random() * 5 + 6;
      const amplitude = Math.random() * 40 + 20;
      const rotationStart = Math.random() * 360;
      const delay = Math.random() * 3;

      const keyframesCount = 20;

      const xOffsets = Array.from({ length: keyframesCount }).map(
        (_, idx) => amplitude * Math.sin((idx / keyframesCount) * Math.PI * 2)
      );

      const rotateKeyframes = Array.from({ length: keyframesCount }).map(
        (_, idx) => rotationStart + Math.sin((idx / keyframesCount) * Math.PI * 4) * 45
      );

      const yKeyframes = Array.from({ length: keyframesCount }).map(
        (_, idx) => `${(idx / keyframesCount) * 100}vh`
      );

      const opacityKeyframes = Array.from({ length: keyframesCount }).map(
        (_, idx) => (idx / keyframesCount < 0.66 ? 1 : 1 - (idx / keyframesCount - 0.66) / 0.34)
      );

      return { startX, startY, scale, duration, xOffsets, rotateKeyframes, yKeyframes, opacityKeyframes, delay };
    });
  }, [COUNT]);

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${leaf.startX}%`, top: `${leaf.startY}%` }}
          initial={{ y: 0, scale: leaf.scale, rotate: leaf.rotateKeyframes[0], opacity: 1 }}
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
            className={`${isDarkMode ? "text-light/70" : "text-dark/70"}`}
          />
        </motion.div>
      ))}
    </div>
  );
}
