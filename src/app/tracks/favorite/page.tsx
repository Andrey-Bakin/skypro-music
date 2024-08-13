"use client";

import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import styles from "../layout.module.css";
import { useEffect, useState } from "react";
import { useInitialLikedTracks } from "@/hooks/initLikes";
import { getFavoriteTracks, setError, setIsLoading } from "@/store/features/playlistSlice";

const FavoriteTracksPage = () => {
  useInitialLikedTracks()
  const dispatch = useAppDispatch();  
  const tracks = useAppSelector((state) => state.playlist.likedTracks);
  const tokens = useAppSelector((state) => state.auth.tokens);
  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks);
  useEffect(() => {
    const fetchTracks = async () => {
      if (tokens.access) {
        dispatch(setIsLoading(true));
        try {
          await dispatch(getFavoriteTracks(tokens.access)).unwrap();
        } catch (err) {
          dispatch(setError("Не удалось загрузить треки"));
          console.log("Ошибка при загрузке треков:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    // fetchTracks();
  }, [dispatch, tokens.access, tracks]);

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
