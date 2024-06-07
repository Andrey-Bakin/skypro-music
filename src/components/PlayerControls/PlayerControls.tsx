import styles from "./PlayerControls.module.css";

type PlayerControlsType = {
  togglePlay: () => void;
  isPlaying: boolean;
  isLooping: boolean;
  toggleLoop: () => void;
};

export default function PlayerControls({
  togglePlay,
  isPlaying,
  isLooping,
  toggleLoop,
}: PlayerControlsType) {

  function nextSong() {
    return alert("еще не реализовано")
  }

  return (
    <div className={styles.playerControls}>
      <div onClick={nextSong} className="player__btn-prev">
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="/image/icon/sprite.svg#icon-prev" />
        </svg>
      </div>
      <div onClick={togglePlay} className="player__btn-play _btn">
        <svg className={styles.playerBtnPlaySvg}>
          <use
            xlinkHref={`/image/icon/sprite.svg#${
              isPlaying ? "icon-pause" : "icon-play"
            }`}
          />
        </svg>
      </div>
      <div onClick={nextSong} className="player__btn-next">
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="/image/icon/sprite.svg#icon-next" />
        </svg>
      </div>
      <div onClick={toggleLoop} className="player__btn-repeat _btn-icon">
        <svg className={styles.playerBtnRepeatSvg}>
          <use
            xlinkHref={`/image/icon/sprite.svg#${
              isLooping ? "icon-repeat-toggled" : "icon-repeat"
            }`}
          />
        </svg>
      </div>
      <div onClick={nextSong} className="player__btn-shuffle _btn-icon">
        <svg className={styles.playerBtnShuffleSvg}>
          <use xlinkHref="/image/icon/sprite.svg#icon-shuffle" />
        </svg>
      </div>
    </div>
  );
}
