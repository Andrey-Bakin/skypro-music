import styles from "./PlayerTrackNow.module.css";
import classNames from "classnames";

export default function PlayerTrackNow() {
  return (
    <div className={styles.playerTrackPlay}>
      <div className={styles.trackPlayContain}>
        <div className={styles.trackPlayImage}>
          <svg className={styles.trackPlaySvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackPlayAuthor}>
          <a className={styles.trackPlayAuthorLink} href="http://">
            Ты та...
          </a>
        </div>
        <div className={styles.trackPlayAlbum}>
          <a className={styles.trackPlayAlbumLink} href="http://">
            Баста
          </a>
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