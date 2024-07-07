import {
  postLoginUser,
  postRefreshToken,
  postRegUser,
  postToken,
} from "@/api/user";
import { SigninType, SignupType, UserType } from "@/types";
import { getValueFromLocalStorage } from "@/utils/getValueFromLS";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }: SigninType) => {
    const user = await postLoginUser({ email, password });
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

export const getTokens = createAsyncThunk(
  "user/getToken",
  async ({ email, password }: SigninType) => {
    const token = await postToken({ email, password });
    localStorage.setItem(
      "token",
      JSON.stringify({
        access: token.access,
        refresh: token.refresh,
      })
    );
    return token;
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (refresh: string) => {
    const tokens = await postRefreshToken(refresh);
    localStorage.setItem(
      "tokens",
      JSON.stringify({
        access: tokens.access,
        refresh: tokens.refresh,
      })
    );
    return tokens;
  }
);

export const postUser = createAsyncThunk(
  "user/userReg",
  async ({ email, userpassword, username }: SignupType) => {
    const user = await postRegUser({ email, userpassword, username });
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

export type AuthStateType = {
  user: null | UserType;
  token: {
    access: string | null;
    refresh: string | null;
  };
  authState: boolean;
  userData: {
    id: number;
    email: string;
    username: string;
    refresh: string;
    access: string;
  };
};

type TokensType = {
  access: string | null;
  refresh: string | null;
};

function checkLSAuth(key: string) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "");
    return data || null;
  } catch (error) {
    return null;
  }
}

const initialState: AuthStateType = {
  user: null,
  token: {
    access: null,
    refresh: null,
  },
  authState: !!checkLSAuth("user"),
  userData: checkLSAuth("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    setUserData: (
      state,
      action: PayloadAction<{
        email?: string;
        username?: string;
        refresh?: string;
        access?: string;
        id?: number;
      } | null>
    ) => {
      state.userData = {
        id: action.payload?.id || state.userData.id,
        email:
          action.payload?.email ||
          state.userData.email ||
          getValueFromLocalStorage("user"),
        username: action.payload?.username || state.userData.username,
        refresh: action.payload?.refresh || state.userData?.refresh || "",
        access:
          action.payload?.access ||
          state.userData?.access ||
          getValueFromLocalStorage("token"),
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
      })
      .addCase(
        getTokens.fulfilled,
        (
          state,
          action: PayloadAction<{
            access: string | null;
            refresh: string | null;
          }>
        ) => {
          state.token.access = action.payload.access;
          state.token.refresh = action.payload.refresh;
        }
      )
      .addCase(
        refreshToken.fulfilled,
        (state, action: PayloadAction<TokensType>) => {
          (state.token.access = action.payload.access),
            (state.token.refresh = action.payload.refresh);
        }
      )
      .addCase(postUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
      });
  },
});

export const { setAuthState, setUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
