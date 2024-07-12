"use client";

import { fetchFavoritesTracks } from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setAuthState } from "@/store/features/authSlice";
import { TrackType } from "@/types/types";
import { useRouter } from "next/navigation";
import styles from "../layout.module.css";
import { useEffect, useState } from "react";

export default function FavoriteTracksPage() {
  const token = useAppSelector((state) => state.auth.token?.access);
  const authState = useAppSelector((state) => state.auth.authState);
  const [tracksData, setTracksData] = useState<TrackType[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favoriteTracks = useAppSelector((state) => state.playlist.likedTracks);

  useEffect(() => {
    fetchFavoritesTracks(token as string)
      .then((data) => {
        setTracksData(data);
      })
      .catch((error) => {
        if (error.message === "401") {
          dispatch(setAuthState(false));
        } else {
          alert(error.message);
        }
      });
  }, [dispatch, router, token]);

  useEffect(() => {
    if (!authState) {
      alert("Вам необходимо авторизоваться!");
      router.push("/signin");
    }
  }, [authState, router]);

  return (
    <div >
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <CenterBlock
        tracks={tracksData}
        playlist={tracksData}
        isFavorite={true}
      />
    </div>
  );
}
