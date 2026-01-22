export const getMotionScale = () => {
  if (typeof window === 'undefined') return 1;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    '--motion-scale'
  );
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 1;
};
