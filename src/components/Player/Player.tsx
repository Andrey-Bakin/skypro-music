"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import PlayerControls from "../PlayerControls/PlayerControls";
import PlayerTrackNow from "../PlayerTrackNow/PlayerTrackNow";
import VolumeBar from "../VolumeBar/VolumeBar";
import styles from "./Player.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { durationFormat } from "@/utils/durationFormat";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setIsPlaying, setNextTrack } from "@/store/features/playlistSlice";

export default function Player() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);

  const [currentTime, setCurrentTime] = useState<number>(0);

  const dispatch = useAppDispatch();

  const [volume, setVolume] = useState<number>(0.5);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const duration = audioRef.current?.duration || 0;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const handdleEnded = () => {
      dispatch(setNextTrack());
    };

    audio?.addEventListener("ended", handdleEnded);

    return () => audio?.removeEventListener("ended", handdleEnded);
  }, [dispatch, audioRef.current]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
    audioRef.current?.addEventListener("ended", () => {
      setCurrentTime(0);
    });
  }, [volume, duration]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
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

  const handleSeek = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  }, []);

  const handleVolume = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(event.target.value);
      setVolume(audioRef.current.volume);
    }
  }, []);

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              src={currentTrack.track_file}
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
                  isLooping={isLooping}
                />
                <PlayerTrackNow track={currentTrack} />
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
      )}
    </>
  );
}
