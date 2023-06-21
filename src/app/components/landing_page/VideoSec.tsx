'use client'

import React, { useRef, useState } from "react";
import YouTube from "react-youtube";
import GradientWrapper from "../GradientWrapper";
import { MdPlayArrow, MdPause, MdVolumeMute, MdVolumeUp } from "react-icons/md";

const VideoSec: React.FC = () => {
  const videoRef = useRef<any>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleTogglePlayback = () => {
    const video = videoRef.current;
    if (video && video.internalPlayer) {
      if (video.internalPlayer.getPlayerState() === 1) {
        video.internalPlayer.pauseVideo();
        setIsPaused(true);
      } else {
        video.internalPlayer.playVideo();
        setIsPaused(false);
      }
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video && video.internalPlayer) {
      if (video.internalPlayer.isMuted()) {
        video.internalPlayer.unMute();
        setIsMuted(false);
      } else {
        video.internalPlayer.mute();
        setIsMuted(true);
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <GradientWrapper wrapperClassName="max-w-2xl md:max-w-lg lg:max-w-2xl h-[40%] top-[30%] inset-x-0" className="h-fit">
      <YouTube
        videoId="l-2nxHQJh6M" // Replace with the YouTube video ID
        className="video-container w-[70vw] h-[500px]"
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            loop: 1,
            rel: 0,
            quality: "hd1080",
          },
        }}
        onReady={(event) => {
          videoRef.current = event.target;
        }}
      />
      </GradientWrapper>
    </div>
  );
};

export default VideoSec;
