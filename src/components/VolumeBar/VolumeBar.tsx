import styles from "./VolumeBar.module.css";
import classNames from "classnames";

export default function VolumeBar() {
  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={(classNames(styles.volumeProgress), "_btn")}>
          <input
            className={(classNames(styles.volumeProgressLine), "_btn")}
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
}