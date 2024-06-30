'use client'

import { getTracks } from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { TrackType } from "@/types";
import { useEffect, useState } from "react";



export default function MainTraksPage() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );

  useEffect(() => {
    getTracks().then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({ initialTracks: tracksData }));
    });
  }, [dispatch]);
  return <CenterBlock tracks={filteredTracks} playlist={tracks} />;
}


