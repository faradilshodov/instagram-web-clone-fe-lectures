"use client";
// import styled from "styled-components";
import styled, { keyframes, css } from "styled-components";
import { Story } from "./ProfileStoriesGrid";
import { useState, useRef } from "react";
import Image from "next/image";

import MuteSpeakerIcon from "../../../../public/icons/speaker-muted.svg";
import UnmuteSpeakerIcon from "../../../../public/icons/speaker-unmuted.svg";
import PlayIcon from "../../../../public/icons/play-solid.svg";
import PauseIcon from "../../../../public/icons/pause-solid.svg";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StoriesBackdrop = styled.div`
  position: fixed;
  background-color: black;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 20;

  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1.5fr;

  justify-items: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 30;
`;

const ControlButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  z-index: 40;
`;

const MuteButton = styled(ControlButton)`
  top: 150px;
  right: 610px;

  img {
    width: 30px;
    height: 30px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;

const PlayPauseButton = styled(ControlButton)`
  top: 400px;
  right: 720px;

  img {
    width: 50px;
    height: 50px;
    filter: invert(100%);
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;

// const StyledVideo = styled.video`
//   height: 70%;
//   width: 70%;
//   object-fit: cover;
//   border-radius: 10px;
//   max-width: 300px;
// `;

const StyledVideo = styled.video<{ fadeState: "in" | "out" | "none" }>`
  height: 70%;
  width: 70%;
  object-fit: cover;
  border-radius: 10px;
  max-width: 300px;

  ${({ fadeState }) =>
    fadeState === "in" &&
    css`
      animation: ${fadeIn} 0.5s forwards;
    `}

  ${({ fadeState }) =>
    fadeState === "out" &&
    css`
      animation: ${fadeOut} 0.5s forwards;
    `}
`;

const NavigationThumbnail = styled.img`
  height: 35%;
  width: 70%;
  border-radius: 10px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }

  cursor: pointer;
  max-width: 150px;
`;

interface ProfileStoriesModalPropTypes {
  closeModal: () => void;
  stories: Story[];
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number) => void;
}

export default function ProfileStoriesModal({
  closeModal,
  stories,
  currentStoryIndex,
  setCurrentStoryIndex,
}: ProfileStoriesModalPropTypes) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fadeState, setFadeState] = useState<'in' | 'out' | 'none'>('none');
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasNext: boolean = currentStoryIndex < stories.length - 1;
  const hasPrevious: boolean = currentStoryIndex > 0;

//   const goToPreviousStory = () => {
//     if (hasPrevious) {
//       setCurrentStoryIndex(currentStoryIndex - 1);
//     }
//   };

//   const goToNextStory = () => {
//     if (hasNext) {
//       setCurrentStoryIndex(currentStoryIndex + 1);
//     }
//   };

const goToPreviousStory = () => {
    if (hasPrevious) {
      setFadeState('out');
      setTimeout(() => {
        setCurrentStoryIndex(currentStoryIndex - 1);
        setFadeState('in');
      }, 500); // Match the duration of the fadeOut animation
    }
  };

  const goToNextStory = () => {
    if (hasNext) {
      setFadeState('out');
      setTimeout(() => {
        setCurrentStoryIndex(currentStoryIndex + 1);
        setFadeState('in');
      }, 500); // Match the duration of the fadeOut animation
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <StoriesBackdrop>
      <CloseButton onClick={closeModal}>X</CloseButton>

      {hasPrevious && (
        <NavigationThumbnail
          src={stories[currentStoryIndex - 1].thumbnail_url}
          onClick={goToPreviousStory}
        />
      )}

      {!hasPrevious && <div></div>}

      <StyledVideo
        ref={videoRef}
        src={stories[currentStoryIndex].video_url}
        autoPlay
        muted={isMuted}
        loop
        fadeState={fadeState}
      />

      <MuteButton onClick={toggleMute}>
        <Image
          src={isMuted ? MuteSpeakerIcon : UnmuteSpeakerIcon}
          alt={isMuted ? "Muted" : "Unmuted"}
        />
      </MuteButton>

      <PlayPauseButton onClick={togglePlayPause}>
        <Image
          src={isPlaying ? PauseIcon : PlayIcon}
          alt={isPlaying ? "Pause" : "Play"}
        />
      </PlayPauseButton>

      {hasNext && (
        <NavigationThumbnail
          src={stories[currentStoryIndex + 1].thumbnail_url}
          onClick={goToNextStory}
        />
      )}
    </StoriesBackdrop>
  );
}
