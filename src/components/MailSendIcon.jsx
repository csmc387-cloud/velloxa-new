import React, { forwardRef, useImperativeHandle, useState } from "react";

const MailSendIcon = forwardRef(
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
          className="overflow-visible"
        >
          <g
            className={`transition-all duration-300 ease-out origin-center ${
              isHovered
                ? "translate-x-1 -translate-y-1 scale-110"
                : "translate-x-0 translate-y-0 scale-100"
            }`}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
          </g>
        </svg>
      </div>
    );
  }
);

MailSendIcon.displayName = "MailSendIcon";
export default MailSendIcon;
