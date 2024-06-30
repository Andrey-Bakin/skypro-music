"use client";

import { TrackType } from "@/types";
import PlaylistHeader from "../PlaylistHeder/PlaylistHeader";
import Track from "../Track/Track";
import styles from "./CenterBlock.module.css";

export default function CenterBlock({
  tracks,
  playlist,
}: {
  tracks: TrackType[];
  playlist: TrackType[];
}) {
  return (
    <>
      <PlaylistHeader />
      <div className={styles.contentPlaylist}>
        {tracks?.length === 0
          ? "Нет треков, удовлетворяющих условиям фильтра"
          : ""}
        {tracks?.map((track) => (
          <Track key={track.id} track={track} tracksData={playlist} />
        ))}
      </div>
    </>
  );
}
