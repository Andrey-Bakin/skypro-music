"use client";

import { TrackType } from "@/types/types";
import PlaylistHeader from "../PlaylistHeder/PlaylistHeader";
import Track from "../Track/Track";
import styles from "./CenterBlock.module.css";

export default function CenterBlock({
  tracks,
  playlist,
  isFavorite,
  isLoading,
  filteredTracks,
}: {
  tracks: TrackType[];
  playlist: TrackType[];
  isFavorite?: boolean;
  isLoading?: boolean;
  filteredTracks?: TrackType[]
}) {
  return (
    <div className={styles.mainCenterblock}>
      <PlaylistHeader />
      {tracks?.length === 0 &&
        isLoading &&
        "Нет треков, удовлетворяющих условиям фильтра"}
      {!isLoading && (
        <div className={styles.contentPlaylist}>
          {tracks?.map((track) => (
            <Track
              key={track.id}
              track={track}
              tracksData={playlist}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
