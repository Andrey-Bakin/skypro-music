import { postLoginUser, postRefreshToken, postRegUser, postToken } from "@/api/user";
import { SigninType, SignupType, TokensType, UserType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async({ email, password }: SigninType) => {
    const user = await postLoginUser({ email, password })
    return user
  }
)

export const getTokens = createAsyncThunk(
  "user/getTokens",
  async ({ email, password }: SigninType) => {
    const tokens = await postToken({ email, password })
    return tokens
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
    const token = await postRefreshToken(refresh)
    return token
  }
)

function getValueFronLS (key: string) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    null
  }
}

type AuthStateType = {
  user: null | UserType,
  tokens: {
    access: string | null,
    refresh: string | null
  }
};

const initialState: AuthStateType = {
  user: getValueFronLS("user"),
  tokens: {
    access: getValueFronLS("access"),
    refresh: getValueFronLS("refresh")
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) =>{
      state.user = action.payload
    }).addCase(getTokens.fulfilled, (state, action: PayloadAction<TokensType>) =>{
      state.tokens.access = action.payload.access;
      state.tokens.refresh = action.payload.refresh;
    }).addCase(getSignup.fulfilled, (state, action: PayloadAction<UserType>) =>{
      state.user = action.payload;
    }).addCase(getNewAccessToken.fulfilled, (state, action: PayloadAction<string>) =>{
      state.tokens.access = action.payload;
    })
  }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;