import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getFavoritesTracks } from "./store/features/playlistSlice";

export function useInitialLikedTracks() {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    useEffect(() => {
        if (token.access) {
            dispatch(getFavoritesTracks(token.access))
        }
    }, [token, dispatch]);
}