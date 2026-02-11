import { useReducedMotion } from "../features/settings";

export const useAnimationVariants = (delay = 0, type = "section") => {
  const prefersReducedMotion = useReducedMotion();

  if (type === "section") {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      };
    }

    return {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    };
  }

  if (type === "tag") {
    if (prefersReducedMotion) {
      return {
        containerVariants: {
          visible: {
            transition: {
              staggerChildren: 0,
              delayChildren: 0,
            },
          },
        },
        itemVariants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        },
        itemTransition: {
          duration: 0.2,
        },
      };
    }

    return {
      containerVariants: {
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: 0.1,
          },
        },
      },
      itemVariants: {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0 },
      },
      itemTransition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    };
  }

  if (type === "list") {
    if (prefersReducedMotion) {
      return {
        containerVariants: {
          visible: {
            transition: {
              staggerChildren: 0,
              delayChildren: 0,
            },
          },
        },
        itemVariants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        },
        itemTransition: (_index, _maxIndex = 10) => ({
          duration: 0.2,
        }),
      };
    }

    return {
      containerVariants: {
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.3,
          },
        },
      },
      itemVariants: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
      },
      itemTransition: (index, maxIndex = 10) => ({
        duration: index >= maxIndex ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }),
    };
  }

  if (type === "collapse") {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: {
          duration: 0.2,
        },
      };
    }

    return {
      initial: { height: 0, opacity: 0 },
      animate: { height: "auto", opacity: 1 },
      exit: { height: 0, opacity: 0 },
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    };
  }

  return {};
};
