"use client";

import { getPlaylist } from "@/api/tracks";
import styles from "../../layout.module.css";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { setError, setInitialTracks, setIsLoading } from "@/store/features/playlistSlice";

type CategoryType = {
  params: { id: string };
};

const CategoryPage = ({ params }: CategoryType) => {
  const dispatch = useAppDispatch();
  const filteredTracks = useAppSelector(
    (store) => store.playlist.filteredTracks
  );
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

  useEffect(() => {
    getPlaylist(params.id).then((response) => {
      dispatch(setInitialTracks(response.items));
      dispatch(setIsLoading(true))
    }).catch((err) => {
      console.log(err.message)
      dispatch(setError("Ошибка загрузки треков"))
    });
  }, [dispatch, params.id]);

  return (
    <>
      <h2 className={styles.centerblockH2}>{namePlaylist}</h2>
      <CenterBlock
        tracks={filteredTracks}
      />
    </>
  );
};

export default CategoryPage;
