import { TrackType } from "@/types/types";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setDislike, setLike } from "@/api/likes";
import { setIsLike } from "@/store/features/playlistSlice";

export const useLike = (track: TrackType) => {
  const token = useAppSelector((state) => state.auth.token?.access);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const dispatch = useAppDispatch();
  const isLiked = likedTracks.includes(track.id);
  const handleLike = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!token) {
      alert("Авторизируйтесь чтобы поставить лайк!");
      return;
    }
    const action = isLiked ? setDislike : setLike;
    try {
      await action(token, track.id);
      dispatch(setIsLike({ id: track.id }));
    } catch (err) {
      console.log(err);
      alert("Нужна авторизация")
    }
  };

  return { isLiked, handleLike };
};