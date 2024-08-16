"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getFavoriteTracks } from "@/store/features/playlistSlice";



export function useInitialLikedTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tokens.access) {
          await dispatch(getFavoriteTracks(tokens.access));
        }
      } catch (error: any) {
        console.log(error)
      }
    };

    fetchData();
  }, [tokens.access, dispatch]);
}


