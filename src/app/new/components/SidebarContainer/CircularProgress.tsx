'use client'

import React from 'react'

interface Props {
    progress: number,
}

const CircularProgress:React.FC<Props> = ({progress}) => {
    const strokeWidth = 6;
  const radius = 23 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg width="55" height="55" viewBox={`0 0 45 ${45 + strokeWidth}`}>
      <circle
        cx="23"
        cy="23"
        r={radius}
        fill="none"
        stroke="#414141"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="23"
        cy="23"
        r={radius}
        fill="none"
        stroke="#0784C6"
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference - (progress / 100) * circumference}
        transform="rotate(-90, 23, 23)"
      />
      <text x="23" y="28" textAnchor="middle" fill="#ffffff"
      style={{
        color: 'rgba(255, 255, 255, 0.80)',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '20px',
      }}
      >
        {`${progress}%`}
      </text>
    </svg>
  );
}

export default CircularProgress
