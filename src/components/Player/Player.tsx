"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TrackType } from "@/types";
import PlayerControls from "../PlayerControls/PlayerControls";
import PlayerTrackNow from "../PlayerTrackNow/PlayerTrackNow";
import VolumeBar from "../VolumeBar/VolumeBar";
import styles from "./Player.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { durationFormat } from "@/utils";

type Prop = {
  track: TrackType;
}

export default function Player({ track }: Prop) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const duration = audioRef.current?.duration || 0;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
    audioRef.current?.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
  }, [volume, duration]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      if (isLooping) {
        audioRef.current.loop = false;
      } else {
        audioRef.current.loop = true;
      }
    }
    setIsLooping((prev) => !prev);
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(event.target.value);
      setVolume(audioRef.current.volume);
    }
  };

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          src={track?.track_file}
          ref={audioRef}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
        <div className={styles.trackTimeBlock}>
          <div>{durationFormat(currentTime)}</div>
          <div> / </div>
          <div>{durationFormat(duration)}</div>
        </div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <PlayerControls 
              togglePlay={togglePlay} 
              isPlaying={isPlaying}
              toggleLoop={toggleLoop}
              isLooping={isLooping}/>
            <PlayerTrackNow track={track}/>
          </div>
          <VolumeBar 
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
          />
        </div>
      </div>
    </div>
  );
}
