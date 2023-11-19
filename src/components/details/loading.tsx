import React, { useEffect, useRef } from "react";

const LoadingDots = () => {
  const dotsRef = useRef([]);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const dotStyle = {
    width: "8px",
    height: "8px",
    margin: "0 4px",
    backgroundColor: "white",
    borderRadius: "50%",
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
  };

  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      dot.style.animation = `blink 1.5s ${index * 0.5}s infinite alternate`;
    });
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `}
      </style>
      <div style={containerStyle}>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (dotsRef.current[index] = el)}
            style={dotStyle}
          ></div>
        ))}
      </div>
    </>
  );
};

export default LoadingDots;
