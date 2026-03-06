import { useLayoutEffect, useRef, useState } from "react";

export function useVisibleItems(items) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const counterRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [isMeasured, setIsMeasured] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const compute = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const counterWidth = counterRef.current?.offsetWidth || 60;
      const gap = 8;
      let usedWidth = 0;
      let count = 0;

      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const itemWidth = el.offsetWidth;
        const spaceNeeded = usedWidth + itemWidth + (count > 0 ? gap : 0);
        const willNeedCounter = i < items.length - 1;
        const spaceWithCounter =
          spaceNeeded + (willNeedCounter ? gap + counterWidth : 0);

        if (spaceWithCounter > containerWidth && count > 0) break;
        if (spaceNeeded > containerWidth) break;

        usedWidth = spaceNeeded;
        count++;
      }

      setVisibleCount(Math.max(1, count));
      setIsMeasured(true);
    };

    const timer = setTimeout(compute, 0);

    const observer = new ResizeObserver(() => {
      setIsMeasured(false);
      compute();
    });
    observer.observe(containerRef.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [items]);

  return { containerRef, itemRefs, counterRef, visibleCount, isMeasured };
}
