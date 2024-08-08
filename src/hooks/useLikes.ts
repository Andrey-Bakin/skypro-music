import { TrackType } from "@/types/types";
import { setDislike, setLike } from "@/api/likes";
import { dislikeTrack, likeTrack } from "@/store/features/playlistSlice";
import { AppDispatch, AppStore, RootState } from "@/store/store";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export const useLike = (track: TrackType) => {
  const tokens = useAppSelector((state) => state.auth.tokens);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const dispatch = useAppDispatch();
  const isLiked = likedTracks.some((likedTrack) => likedTrack.id === track.id);
  const handleLike = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const action = isLiked ? setDislike : setLike;
    try {
      await action({
        id: String(track.id),
        access: tokens?.access,
      });
      if (isLiked) {
        dispatch(dislikeTrack(track));
        console.log(likedTracks);
      } else {
        dispatch(likeTrack(track));
        console.log(likedTracks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { isLiked, handleLike };
};
