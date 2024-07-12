import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import styles from "./PlayerControls.module.css";
import {
  setIsPlaying,
  setIsShuffle,
  setNextTrack,
  setPreviousTrack,
} from "@/store/features/playlistSlice";

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
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);
  const dispatch = useAppDispatch();

  const HandleNextTrack = () => {
    dispatch(setNextTrack());
    dispatch(setIsPlaying(true));
  };
  const HandlePreviousTrack = () => {
    dispatch(setPreviousTrack());
    dispatch(setIsPlaying(true));
  };
  const HandleShuffle = () => {
    if (isShuffle) {
      dispatch(setIsShuffle(false));
    } else {
      dispatch(setIsShuffle(true));
    }
  };

  return (
    <div className={styles.playerControls}>
      <div onClick={HandlePreviousTrack} className="player__btn-prev _btn">
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
      <div onClick={HandleNextTrack} className="player__btn-next _btn">
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
      <div onClick={HandleShuffle} className="player__btn-shuffle _btn-icon">
        <svg className={styles.playerBtnShuffleSvg}>
          <use
            xlinkHref={`/image/icon/sprite.svg#${
              isShuffle ? "icon-shuffle-toggled" : "icon-shuffle"
            }`}
          />
        </svg>
      </div>
    </div>
  );
}
