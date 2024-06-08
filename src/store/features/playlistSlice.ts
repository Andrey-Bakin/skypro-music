import { TrackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type playlistStateType = {
  currentTrack: null | TrackType;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  filterOptions: {
    author: string[];
    genre: string[];
    order: string;
    searchValue: string;
  };
  filteredTracks: TrackType[];
  initialTracks: TrackType[];
};

const initialState: playlistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: false,
  filterOptions: {
    author: [],
    genre: [],
    order: "По умолчанию",
    searchValue: "",
  },
  filteredTracks: [],
  initialTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ initialTracks: TrackType[] }>
    ) => {
      state.initialTracks = action.payload.initialTracks;
      state.filteredTracks = action.payload.initialTracks;
    },
    setCurrentTrack: (
      state,
      action: PayloadAction<{
        track: TrackType;
        tracksData: TrackType[];
      }>
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracksData;
      state.shuffledPlaylist = [...action.payload.tracksData].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPreviousTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setInitialTracks,
  setCurrentTrack,
  setNextTrack,
  setPreviousTrack,
  setIsShuffle,
  setIsPlaying,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;