"use client";

import { fetchFavoritesTracks } from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getValueFromLocalStorage } from "@/utils/getValueFromLS";
import { setAuthState } from "@/store/features/authSlice";
import { TrackType } from "@/types";
import { useRouter } from "next/navigation";
import styles from "../layout.module.css";
import { useEffect, useState } from "react";

export default function FavoriteTracksPage() {
  const token = useAppSelector((state) => state.auth.userData?.access);
  const [tracksData, setTracksData] = useState<TrackType[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchFavoritesTracks(token)
      .then((data) => {
        setTracksData(data);
      })
      .catch((error) => {
        if (error.message === "401") {
          dispatch(setAuthState(false));
          router.push("/signin");
        } else {
          alert(error.message);
        }
      });
  }, [dispatch, router, token]);

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
