import type { Variants } from "framer-motion";

/** Easing curve shared by all entry animations (cubic-bezier tuple). */
export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Standard fade + slide-up for cards entering the viewport. */
export const cardEnter: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
};

/** Parent variants that stagger their children by 50ms (per spec). */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

/** Tappable feedback used on cards & buttons. */
export const pressable = {
  whileTap: { scale: 0.97 },
  whileHover: { y: -2 },
};
