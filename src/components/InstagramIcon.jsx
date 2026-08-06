import React, { forwardRef, useImperativeHandle, useState } from "react";

const InstagramIcon = forwardRef(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const startAnimation = () => setIsHovered(true);
    const stopAnimation = () => setIsHovered(false);

    useImperativeHandle(ref, () => ({
      startAnimation,
      stopAnimation,
    }));

    return (
      <div
        className={`inline-flex cursor-pointer ${className}`}
        onMouseEnter={startAnimation}
        onMouseLeave={stopAnimation}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className={`transition-transform duration-300 ease-out origin-center ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            style={{ transformOrigin: "50% 50%" }}
            d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"
          />

          <path
            className={`transition-transform duration-300 ease-out origin-center ${
              isHovered ? "scale-125" : "scale-100"
            }`}
            style={{ transformOrigin: "50% 50%" }}
            d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
          />

          <path
            className={`transition-opacity duration-200 ease-in-out ${
              isHovered ? "opacity-30" : "opacity-100"
            }`}
            d="M16.5 7.5v.01"
          />
        </svg>
      </div>
    );
  }
);

InstagramIcon.displayName = "InstagramIcon";
export default InstagramIcon;
