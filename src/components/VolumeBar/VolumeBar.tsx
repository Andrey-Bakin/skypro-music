import React, { ChangeEvent } from "react";
import styles from "./VolumeBar.module.css";
import classNames from "classnames";

type VolumeType = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const VolumeBar = React.memo(({ min, max, step, value, onChange }: VolumeType) => {
  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={(classNames(styles.volumeProgress), "_btn")}>
          <input
            className={(classNames(styles.volumeProgressLine), "_btn")}
            type="range"
            name="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
});

VolumeBar.displayName = "ProgressBar";
export default VolumeBar;