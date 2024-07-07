"use client";

import { TrackType } from "@/types";
import styles from "./Track.module.css";
import { durationFormat } from "@/utils/durationFormat";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playlistSlice";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthState, setUserData } from "@/store/features/authSlice";
import { setDislike, setLike } from "@/api/likes";

type PlaylistType = {
  track: TrackType;
  tracksData: TrackType[];
  isFavorite?: boolean;
};

export default function Track({ track, tracksData, isFavorite }: PlaylistType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const userData = useAppSelector((state) => state.auth.userData);
  const { name, author, album, duration_in_seconds, id, stared_user } = track;
  const isLikedByUser = isFavorite || stared_user.find((u) => u.id === userData?.id);
  const [isLiked, setIsLiked] = useState(!!isLikedByUser);
  const router = useRouter();
  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setAuthState(false));
    dispatch(setUserData(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const HandleTrackClick = () => {
    dispatch(setCurrentTrack({ track: { ...track, isFavorite }, tracksData}));
    dispatch(setIsPlaying(true));
  };

  const handleLikeClick = (event: React. MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    isLiked ? setDislike(userData?.access, id)
    .then(() => {})
    .catch((error) => {
      if (error) {
        const errorData = JSON.parse(error.message);
        if (errorData.ststus === 401) {
          logout();
          router.push("/signin")
        }
      }
    })
    : setLike(userData?.access, id)
    .then(() => {})
    .catch((error) => {
      if (error) {
        const errorData = JSON.parse(error.message);
        if (errorData.ststus === 401) {
          logout();
          router.push("/signin");
        }
      }
    });
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(!!isLikedByUser);
  }, [track, isFavorite, userData, isLikedByUser]);

  return (
    <div onClick={HandleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div  className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg
              className={classNames(styles.trackTitleSvg, {
                [styles.trackTitleSvgPlaying]: isPlaying && isCurrentTrack,
              })}
            >
              <use
                xlinkHref={`/image/icon/sprite.svg#${
                  isCurrentTrack ? "icon-isplaying" : "icon-note"
                }`}
              />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div onClick={handleLikeClick} className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref={`/image/icon/sprite.svg#${isLiked ? "icon-like-active" : "icon-like"}`} />
          </svg>
          <span className={styles.trackTimeText}>
            {durationFormat(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
