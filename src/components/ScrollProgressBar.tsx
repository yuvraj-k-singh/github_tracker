import { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true); // Tracks if the page load animation is active

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const width = (scrollTop / scrollHeight) * 100;
    setScrollWidth(width);
  };

  useEffect(() => {
    // Simulate the page load animation
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false); // End the animation after 2 seconds
    }, 2000);

    // Clean up timeout
    return () => clearTimeout(animationTimeout);
  }, []);

  useEffect(() => {
    // Always listen for scroll events
    window.addEventListener("scroll", handleScroll);
    // Call handleScroll once on mount to set initial position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Left-to-right animation during page load */}
      {isAnimating && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "0", // Start from zero width
            height: "2px", // Thinner line for loading
            backgroundColor: "blue",
            zIndex: 100,
            animation: "slideIn 2s ease-in-out forwards", // Animation
          }}
        />
      )}

      {/* Scroll progress bar after animation ends */}
      {!isAnimating && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${scrollWidth}%`,
            height: "3px",
            backgroundColor: "#3b82f6",
            zIndex: 100,
            transition: "width 0.1s ease",
          }}
        />
      )}

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes slideIn {
            from {
              width: 0; /* Start from the left edge */
            }
            to {
              width: 100%; /* Fill the screen */
            }
          }
        `}
      </style>
    </>
  );
};

export default ScrollProgressBar;
