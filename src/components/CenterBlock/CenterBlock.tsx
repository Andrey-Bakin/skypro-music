"use client";

import { getTracks } from "@/api/tracks";
import Filter from "../Filter/Filter";
import PlaylistHeader from "../PlaylistHeder/PlaylistHeader";
import Search from "../Search/Search";
import Track from "../Track/Track";
import styles from "./CenterBlock.module.css";
import { TrackType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";

export default function CenterBlock() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIslosding] = useState<boolean>(false);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );

  useEffect(() => {
    getTracks()
      .then((tracksData) => {
        setTracks(tracksData);
        dispatch(setInitialTracks({ initialTracks: tracksData }));
        setIslosding(true);
      })
      .catch((err) => {
        console.log(err.messge);
        setError("Ошибка загрузки треков");
      });
  }, [dispatch]);

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblockContent}>
        <PlaylistHeader />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {filteredTracks.length === 0 && isLoading && "Поиск не дал результатов"}
        {isLoading && (
          <div className={styles.contentPlaylist}>
            {filteredTracks.map((track) => (
              <Track key={track.id} track={track} tracksData={tracks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
