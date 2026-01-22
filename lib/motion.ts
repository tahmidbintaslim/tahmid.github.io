export const slideInFromLeft = (delay: number = 0) => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const slideInFromRight = (delay: number = 0) => ({
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

export const slideInFromTop = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
