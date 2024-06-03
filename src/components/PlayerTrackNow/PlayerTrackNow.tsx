import { TrackType } from "@/types";
import styles from "./PlayerTrackNow.module.css";
import classNames from "classnames";

type PlayerTrackNowType = {
  track: TrackType;
};

export default function PlayerTrackNow({ track }: PlayerTrackNowType ) {
  return (
    <div className={styles.playerTrackPlay}>
      <div className={styles.trackPlayContain}>
        <div className={styles.trackPlayImage}>
          <svg className={styles.trackPlaySvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackPlayAuthor}>
          <span className={styles.trackPlayAuthorLink} >
            {track?.name}
          </span>
        </div>
        <div className={styles.trackPlayAlbum}>
          <span className={styles.trackPlayAlbumLink} >
            {track?.author}
          </span>
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        <div className={(classNames(styles.trackPlayLike), "_btn-icon")}>
          <svg className={styles.trackPlayLikeSvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-like" />
          </svg>
        </div>
        <div className={(classNames(styles.trackPlayDislike), "_btn-icon")}>
          <svg className={styles.trackPlayDislikeSvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-dislike" />
          </svg>
        </div>
      </div>
    </div>
  );
}