"use client";

import { TrackType } from "@/types";
import styles from "./PlayerTrackNow.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDislike, setLike } from "@/api/likes";
import { useRouter } from "next/navigation";
import { setAuthState, setUserData } from "@/store/features/authSlice";

type PlayerTrackNowType = {
  track: TrackType;
  isFavorite?: boolean;
};

export default function PlayerTrackNow({
  track,
  isFavorite,
}: PlayerTrackNowType) {
  const userData = useAppSelector((state) => state.auth.userData);
  const { id, stared_user } = track;
  const isLikedByUser =
    isFavorite || stared_user.find((u) => u.id === userData?.id);
  const [isLiked, setIsLiked] = useState(!!isLikedByUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setAuthState(false));
    dispatch(setUserData(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleLikeClick = () => {
    isLiked
      ? setDislike(userData?.access, id)
          .then(() => {})
          .catch((error) => {
            if (error) {
              const errorData = JSON.parse(error.message);
              if (errorData.status === 401) {
                logout();
                router.push("/signin");
              }
            }
          })
      : setLike(userData?.access, id)
          .then(() => {})
          .catch((error) => {
            if (error) {
              const errorData = JSON.parse(error.message);
              if (errorData.status === 401) {
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
    <div className={styles.playerTrackPlay}>
      <div className={styles.trackPlayContain}>
        <div className={styles.trackPlayImage}>
          <svg className={styles.trackPlaySvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackPlayAuthor}>
          <span className={styles.trackPlayAuthorLink}>{track?.name}</span>
        </div>
        <div className={styles.trackPlayAlbum}>
          <span className={styles.trackPlayAlbumLink}>{track?.author}</span>
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        <div
          onClick={handleLikeClick}
          className={(classNames(styles.trackPlayLike), "_btn-icon")}
        >
          <svg className={styles.trackPlayLikeSvg}>
            <use
              xlinkHref={`/image/icon/sprite.svg#${
                isLiked ? "icon-like-active" : "icon-like"
              }`}
            />
          </svg>
        </div>
        {/* <div className={(classNames(styles.trackPlayDislike), "_btn-icon")}>
          <svg className={styles.trackPlayDislikeSvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-dislike" />
          </svg>
        </div> */}
      </div>
    </div>
  );
}
