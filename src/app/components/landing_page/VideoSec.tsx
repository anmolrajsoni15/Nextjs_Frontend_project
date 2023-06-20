'use client'

import React, { useRef, useState } from "react";
import { MdPlayArrow, MdPause, MdVolumeMute, MdVolumeUp } from "react-icons/md";

const VideoSec: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleTogglePlayback = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play();
      setIsPaused(false);
    } else if (video) {
      video.pause();
      setIsPaused(true);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        style={{ width: "70vw", height: "fit-content" }}
        poster="/video/thumbnail.png"
      >
        <source src="/video/version_2.mp4" className="w-full" />
      </video>
      {isHovered && (
        <>
          <button
            onClick={handleTogglePlayback}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white w-full h-full"
          >
            {isPaused ? (
              <MdPlayArrow className="text-6xl" />
            ) : (
              <MdPause className="text-6xl" />
            )}
          </button>
          <button
            onClick={handleToggleMute}
            className="absolute top-2 left-2 bg-white bg-opacity-50 rounded-full p-2"
          >
            {isMuted ? (
              <MdVolumeMute className="text-2xl" />
            ) : (
              <MdVolumeUp className="text-2xl" />
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default VideoSec;

