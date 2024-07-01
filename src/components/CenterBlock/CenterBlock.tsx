"use client";

import { TrackType } from "@/types";
import PlaylistHeader from "../PlaylistHeder/PlaylistHeader";
import Track from "../Track/Track";
import styles from "./CenterBlock.module.css";

export default function CenterBlock({
  tracks,
  playlist,
  isLoading,
}: {
  tracks: TrackType[];
  playlist: TrackType[];
  isLoading: boolean;
}) {
  return (
    <div className={styles.mainCenterblock}>
      <PlaylistHeader />

      {tracks?.length === 0 &&
        isLoading &&
        "Нет треков, удовлетворяющих условиям фильтра"}
      {isLoading && (
        <div className={styles.contentPlaylist}>
          {tracks?.map((track) => (
            <Track key={track.id} track={track} tracksData={playlist} />
          ))}
        </div>
      )}
    </div>
  );
}
