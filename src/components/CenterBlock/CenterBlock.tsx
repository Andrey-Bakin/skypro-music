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
  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)

  useEffect(() => {
    getTracks().then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({ initialTracks: tracksData }));
    });
  }, [dispatch]);

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblockContent}>
        <PlaylistHeader />
        <div className={styles.contentPlaylist}>
          {filteredTracks.map((track) => (
            <Track key={track.id} track={track} tracksData={tracks} />
          ))}
        </div>
      </div>
    </div>
  );
}
