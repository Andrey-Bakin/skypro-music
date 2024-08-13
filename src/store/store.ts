import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playlistReducer } from "./features/playlistSlice";
import { authReducer } from "./features/authSlice";

export const rootReduser = combineReducers({
  playlist: playlistReducer,
  auth: authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReduser,
  });
};

export type RootState = ReturnType<AppStore["getState"]>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
