"use client";

import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import styles from "../layout.module.css";
import { useEffect } from "react";
import { getFavoriteTracks, setError, setIsLoading } from "@/store/features/playlistSlice";

const FavoriteTracksPage = () => {
  const dispatch = useAppDispatch();  
  const tracks = useAppSelector((state) => state.playlist.likedTracks);
  const tokens = useAppSelector((state) => state.auth.tokens);
  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks);

  useEffect(() => {
    const loadFavoriteTracks = async () => {
      if (!tokens.access) return; 
      dispatch(setIsLoading(true));
  
      try {
        await dispatch(getFavoriteTracks(tokens.access)).unwrap();
      } catch (error) {
        dispatch(setError("Не удалось загрузить треки"));
        console.error("Ошибка при загрузке треков:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadFavoriteTracks();
  }, [dispatch, tokens.access]);

  console.log(tracks)
 
  return (
    <div >
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <CenterBlock
        tracks={tracks}
      />
    </div>
  );
};

export default FavoriteTracksPage;
