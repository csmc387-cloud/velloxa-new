import React, { forwardRef, useImperativeHandle, useState } from "react";

const PhoneIcon = forwardRef(
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
          viewBox="0 0 32 32"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeMiterlimit="10"
        >
          <path
            className={`transition-transform duration-300 ease-out origin-center ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            style={{ transformOrigin: "50% 50%" }}
            d="m21.3832,18.2745l-3.1744,3.9688c-3.4906-2.0516-6.3996-4.9606-8.4513-8.4513l3.9702-3.1756L9.9013,1.9994l-6.4617,1.6761c-.9444.2466-1.555,1.1606-1.4212,2.1274,1.7626,12.5517,11.6278,22.4169,24.1795,24.1795.9665.1332,1.8799-.4773,2.1264-1.4212l1.6758-6.4603-8.6168-3.8264Z"
          />

          <path
            className={`transition-all duration-300 ease-out origin-center ${
              isHovered ? "scale-115 opacity-100" : "scale-100 opacity-70"
            }`}
            style={{ transformOrigin: "21.5px 10.5px" }}
            d="m19,8c2.7614,0,5,2.2386,5,5"
          />

          <path
            className={`transition-all duration-400 ease-out origin-center ${
              isHovered ? "scale-125 opacity-100" : "scale-100 opacity-50"
            }`}
            style={{ transformOrigin: "24px 8px" }}
            d="m19,3c5.5228,0,10,4.4772,10,10"
          />
        </svg>
      </div>
    );
  }
);

PhoneIcon.displayName = "PhoneIcon";
export default PhoneIcon;
