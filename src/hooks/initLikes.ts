import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setLikeTack } from "../store/features/playlistSlice";
import { TrackType } from "../types/types";
import { fetchFavoritesTracks } from "../api/tracks";

export function useInitialLikedTracks() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token?.access);

  useEffect(() => {
    if (token) {
      fetchFavoritesTracks(token)
        .then((data) => {
          dispatch(setLikeTack(data.map((track: TrackType) => track.id)));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, dispatch]);
}
