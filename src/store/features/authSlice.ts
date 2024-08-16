import { postLoginUser, postRefreshToken, postRegUser, postToken } from "@/api/user";
import { SigninType, SignupType, TokensType, UserType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export function getValueFronLS (key: string) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("ошибка", error);
  }
}

export function setValueToLS(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("ошибка", error);
  }
}

export const getUser = createAsyncThunk(
  "user/getUser",
  async({ email, password }: SigninType) => {
    const user = await postLoginUser({ email, password })
    return user;
  }
);

export const getTokens = createAsyncThunk(
  "user/getTokens",
  async ({ email, password }: SigninType) => {
    const tokens = await postToken({ email, password });
    setValueToLS("tokens", tokens);
    return tokens;
  }
)

export const getSignup = createAsyncThunk(
  "user/getSignup",
  async ({ email, username, password }: SignupType) => {
    const user = await postRegUser({ email, username, password })
    return user
  }
)

export const getNewAccessToken = createAsyncThunk(
  "user/getNewAccessToken",
  async (refresh: string) => {
    const tokens = await postRefreshToken(refresh);
    return tokens;
  }
);

const initialState = {
  user: getValueFronLS("user"),
  tokens: {
    access: getValueFronLS("access"),
    refresh: getValueFronLS("refresh"),
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
      localStorage.removeItem("user");
      localStorage.removeItem("tokens");
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) =>{
      state.user = action.payload;
    }).addCase(getTokens.fulfilled, (state, action: PayloadAction<TokensType>) =>{
      (state.tokens.access = action.payload.access),
      (state.tokens.refresh = action.payload.refresh);
    }).addCase(getSignup.fulfilled, (state, action: PayloadAction<UserType>) =>{
      state.user = action.payload;
    }).addCase(getNewAccessToken.fulfilled, (state, action: PayloadAction<TokensType>) =>{
      (state.tokens.access = action.payload.access),
      (state.tokens.refresh = action.payload.refresh);
    })
  }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;