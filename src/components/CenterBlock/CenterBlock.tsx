"use client";

import { TrackType } from "@/types/types";
import PlaylistHeader from "../PlaylistHeder/PlaylistHeader";
import Track from "../Track/Track";
import styles from "./CenterBlock.module.css";
import { useAppSelector } from "@/hooks/hooks";

export default function CenterBlock({ tracks }: { tracks: TrackType[] }) {
  const error = useAppSelector((state) => state.playlist.error);
  const isLoading = useAppSelector((state) => state.playlist.isLoading);

  return (
    <div className={styles.mainCenterblock}>
      <PlaylistHeader />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && <p>Треки загружаются</p>}
      {isLoading && tracks.length === 0 && "ничего не найдено"}
      <div className={styles.contentPlaylist}>
        {tracks.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
