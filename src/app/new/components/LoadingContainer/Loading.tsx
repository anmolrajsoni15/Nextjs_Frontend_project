import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <svg className="loading-square" viewBox="0 0 120 120">
        <path className="loading-path" d="M10 5 L10 100 L100 100 L100 10 L45 10" />
      </svg>

    </div>
  );
};

export default Loading;
