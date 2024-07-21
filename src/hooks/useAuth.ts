import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setAuthState, setUserData, refreshToken as refreshTokenAction } from "@/store/features/authSlice";
import { postRefreshToken } from "@/api/user";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.auth.token?.refresh);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);
        const tokenData = JSON.parse(storedToken);

        dispatch(setUserData({
          id: user.id,
          email: user.email,
          username: user.username,
          access: tokenData.access,
          refresh: tokenData.refresh,
        }));

        dispatch(setAuthState(true));

        // try {
        //   const newToken = await postRefreshToken(tokenData.refresh);
        //   dispatch(refreshTokenAction({ access: newToken.access }));
        //   localStorage.setItem("token", JSON.stringify({ ...tokenData, access: newToken.access }));
        // } catch (error) {
        //   console.error("Failed to refresh token:", error);
        //   dispatch(setAuthState(false));
        //   localStorage.removeItem("user");
        //   localStorage.removeItem("token");
        // }
      }
    };

    if (refreshToken) {
      initializeAuth();
    }
  }, [dispatch, refreshToken]);
};