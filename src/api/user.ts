import { SigninType, SignupType, UserType } from "@/types";

const apiUrlUser = "https://skypro-music-api.skyeng.tech/user/";

const signup = "signup/";
const login = "login/";
const token = "token/";
const tokenRefresh = "token/refresh/";

export async function postLoginUser({ email, password }: SigninType) {
  const response = await fetch(apiUrlUser + login, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 400) {
    throw new Error("Введите значение в поле");
  } else if (response.status === 401) {
    throw new Error("Пользователь с таким email или паролем не найден");
  } else if (response.status === 500) {
    throw new Error("Сервер не отвечает");
  }
  const data = await response.json();
  return data;
}

export async function postRegUser({ email, userpassword }: SignupType) {
  const response = await fetch(apiUrlUser + signup, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: userpassword,
      username: email,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  // if (!responce.ok) {
  //   throw new Error("Ошибка");
  // }
  const data = await response.json();

  return data;
}

export async function postToken({ email, password }: SigninType) {
  const response = await fetch(apiUrlUser + token, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data;
}

export async function postRefreshToken(refresh : string) {
  const response = await fetch(apiUrlUser + tokenRefresh, {
    method: "POST",
    body: JSON.stringify({
      refresh: refresh,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data;
}