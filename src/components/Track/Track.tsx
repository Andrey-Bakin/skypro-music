"use client";

import { TrackType } from "@/types";
import styles from "./Track.module.css";
import { durationFormat } from "@/utils/durationFormat";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playlistSlice";
import classNames from "classnames";

type PlaylistType = {
  track: TrackType;
  tracksData: TrackType[];
};

export default function Track({ track, tracksData }: PlaylistType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const { name, author, album, duration_in_seconds, id } = track;
  const isCurrentTrack = currentTrack ? currentTrack.id === id : false;
  const dispatch = useAppDispatch();

  const HandleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
    dispatch(setIsPlaying(true));
  };

  return (
    <div onClick={HandleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
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
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>
            {durationFormat(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
