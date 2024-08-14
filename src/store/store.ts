import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playlistReducer } from "./features/playlistSlice";
import { authReducer } from "./features/authSlice";
// import { allTracksApi } from "./servises/tracksApi";

export const rootReduser = combineReducers({
  playlist: playlistReducer,
  auth: authReducer,
  // [allTracksApi.reducerPath]: allTracksApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReduser,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(allTracksApi.middleware)
  });
};

export type RootState = ReturnType<AppStore["getState"]>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
