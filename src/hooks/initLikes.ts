import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { clearLikedTracks, getFavoriteTracks } from "../store/features/playlistSlice";

export function useInitialLikedTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);

  useEffect(() => {
    if (tokens?.access) {
      dispatch(getFavoriteTracks(tokens.access))  
    } else {
      dispatch(clearLikedTracks())
    }
  }, [tokens, dispatch]);
}
