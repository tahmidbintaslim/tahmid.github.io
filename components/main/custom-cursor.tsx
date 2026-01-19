'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | undefined>(
    undefined
  ); // Start undefined to prevent flash

  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

      // Only show custom cursor on devices with hover capability and fine pointer (mouse)
      setIsTouchDevice(hasTouch && !hasHover && !hasFinePointer);
    };

    checkTouchDevice();

    // Listen for media query changes
    const hoverQuery = window.matchMedia('(hover: hover)');
    const handleHoverChange = () => checkTouchDevice();
    hoverQuery.addEventListener('change', handleHoverChange);

    return () => {
      hoverQuery.removeEventListener('change', handleHoverChange);
    };
  }, []);

  useEffect(() => {
    // Don't add event listeners on touch devices
    if (isTouchDevice) return;

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateFollower = () => {
      setFollowerPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const animationFrame = setInterval(updateFollower, 16);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(animationFrame);
    };
  }, [position, isTouchDevice]);

  // Don't render until detection is complete, or if it's a touch device
  if (isTouchDevice === undefined || isTouchDevice) return null;

  return (
    <>
      <div
        id="custom-cursor"
        className={`hidden md:block ${isVisible ? 'active' : ''} ${
          isClicking ? 'clicking' : ''
        }`}
        style={
          {
            '--cursor-x': `${position.x}px`,
            '--cursor-y': `${position.y}px`,
          } as React.CSSProperties
        }
      />
      <div
        id="custom-cursor-follower"
        className={`hidden md:block ${isVisible ? 'active' : ''}`}
        style={
          {
            '--cursor-x': `${followerPosition.x}px`,
            '--cursor-y': `${followerPosition.y}px`,
          } as React.CSSProperties
        }
      />
    </>
  );
}
