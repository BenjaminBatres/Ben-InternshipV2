import React, { useRef, useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";
import { IoPause } from "react-icons/io5";
import { auth, db } from "../firebase/init";
import { doc, setDoc } from "firebase/firestore";

export default function AudioPlayer({ src, book }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Toggle Play/Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // When audio metadata is loaded
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  // When audio plays, update progress
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
  };

  // Handle user moving the slider
  const handleSliderChange = (e) => {
    const audio = audioRef.current;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  // Rewind 10 seconds
  const rewind10 = () => {
    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10
    );
    setProgress(audioRef.current.currentTime);
  };

  // Fast-forward 10 seconds
  const forward10 = () => {
    audioRef.current.currentTime = Math.min(
      duration,
      audioRef.current.currentTime + 10
    );
    setProgress(audioRef.current.currentTime);
  };

  const handleAudioEnded = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid, "finished", book.id);
      await setDoc(docRef, {
        id: book.id,
        title: book.title,
        subTitle: book.subTitle,
        averageRating: book.averageRating,
        author: book.author,
        audioLink: book.audioLink,
        imageLink: book.imageLink,
      }); // Save the book to their library
    } catch (error) {
      console.error("Failed to save book:", error);
    }
  };

  return (
    <>
      <div className="audio__controls--wrapper">
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={rewind10}>
            <RiReplay10Line />
          </button>
          <button
            onClick={togglePlay}
            className="audio__controls--btn-play audio__controls--btn"
          >
            {isPlaying ? (
              <IoPause />
            ) : (
              <IoMdPlay className="audio__controls--play-icon" />
            )}
          </button>
          <button className="audio__controls--btn" onClick={forward10}>
            <RiForward10Line />
          </button>
        </div>
      </div>
      <div className="audio__progress--wrapper">
        <span className="audio__time">{formatTime(progress)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          onChange={handleSliderChange}
          className="audio__progress--bar"
          style={{
            background: `linear-gradient(to right, rgb(43, 217, 124) ${
              (progress / duration) * 100
            }%, rgb(109, 120, 125) ${(progress / duration) * 100}%)`,
          }}
        />
        <span className="audio__time">{formatTime(duration)}</span>

        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
        />
      </div>
    </>
  );
}

function formatTime(time) {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
