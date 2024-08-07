"use client";

import { getPlaylist } from "@/api/tracks";
import styles from "../../layout.module.css";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { TrackType } from "@/types";

type CategoryType = {
  params: { id: string };
};

const CategoryPage = ({ params }: CategoryType) => {
  // const tracksData = await getPlaylist(params.id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const dispatch = useAppDispatch();
  const filteredTracks = useAppSelector(
    (store) => store.playlist.filteredTracks
  );
  useEffect(() => {
    getPlaylist(params.id).then((tracksData) => {
      setTracks(tracksData);
      dispatch(setInitialTracks({ initialTracks: tracksData }));
      setIsLoading(true);
    });
  }, [dispatch]);
  let namePlaylist = "";
  switch (params.id) {
    case "1":
      namePlaylist = "Плейлист дня";
      break;
    case "2":
      namePlaylist = "100 танцевальных хитов";
      break;
    case "3":
      namePlaylist = "Инди-заряд";
      break;
    default:
      break;
  }

  return (
    <>
      <h2 className={styles.centerblockH2}>{namePlaylist}</h2>
      <CenterBlock
        tracks={filteredTracks}
        playlist={filteredTracks}
        isLoading={isLoading}
      />
    </>
  );
};

export default CategoryPage;
