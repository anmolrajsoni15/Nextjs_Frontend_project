"use client";

import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  }, []);

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          recycle={false}
          style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh" }}
          tweenDuration={4000}
        />
      )}
    </>
  );
};

export default Confetti;


