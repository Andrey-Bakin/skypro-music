"use client";

import { TrackType } from "@/types/types";
import styles from "./PlayerTrackNow.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import { setAuthState, setUserData } from "@/store/features/authSlice";
import { useLike } from "@/hooks/useLikes";

type PlayerTrackNowType = {
  track: TrackType;
};

export default function PlayerTrackNow({
  track
}: PlayerTrackNowType) {
  const userData = useAppSelector((state) => state.auth.userData);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {isLiked, handleLike} = useLike(track);

  const logout = () => {
    dispatch(setAuthState(false));
    dispatch(setUserData(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  
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
          onClick={handleLike}
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
        <div onClick={handleLike} className={(classNames(styles.trackPlayDislike), "_btn-icon")}>
          <svg className={styles.trackPlayDislikeSvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-dislike" />
          </svg>
        </div>
      </div>
    </div>
  );
}
