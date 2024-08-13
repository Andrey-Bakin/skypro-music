import { TrackType } from "@/types/types";
import { setDislike, setLike } from "@/api/likes";
import { dislikeTrack, likeTrack, setDislikeTrack } from "@/store/features/playlistSlice";
import { postRefreshToken } from "@/api/user";
import { getNewAccessToken } from "@/store/features/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useLike = (track: TrackType | null) => {
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);

  const dispatch = useAppDispatch();

  const tokens = useAppSelector((state) => state.auth.tokens.access);

  const isLiked = likedTracks.some((tracks) => track?.id === tracks.id);

  const refresh = useAppSelector((state) => state.auth.tokens.refresh);

  const handleLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!tokens) alert("чтобы поставить лайк, авторизуйтесь");
    try {
      if (isLiked) {
        if (tokens && track) {
          await setDislike(tokens, track.id);

          dispatch(setDislikeTrack(track.id));
        }
      } else {
        if (tokens && track) {
          await setLike(tokens, track.id);
          dispatch(likeTrack(track));
        }
      }
    } catch (error: any) {
      const er = JSON.parse(error.message);
      if (er.status === 401) {
        const newTokens = await postRefreshToken(refresh);
        dispatch(getNewAccessToken(newTokens));
        if (isLiked) {
          if (tokens && track) {
            await setDislike(tokens, track.id);
            dispatch(setDislikeTrack(track.id));
          }
        } else {
          if (tokens && track) {
            await setLike(tokens, track.id);
            dispatch(likeTrack(track));
          }
        }
      }
      alert("Ошибка, нет доступа");
      console.log(error.message);
    }
  };

  return { isLiked, handleLike };
};
