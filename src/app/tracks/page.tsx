"use client";

import { getTracks } from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { TrackType } from "@/types/types";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import Filter from "@/components/Filter/Filter";

export default function MainTraksPage() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );

  useEffect(() => {
    getTracks().then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({ initialTracks: tracksData }));
      setIsLoading(true);
    });
  }, [dispatch]);
  return (
    <>
      <div>
        <h2 className={styles.centerblockH2}>Треки</h2>
        <Filter />
        <CenterBlock
          tracks={filteredTracks}
          playlist={tracks}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
