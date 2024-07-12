"use client";

import Link from "next/link";
import styles from "./Signin.module.css";
import Image from "next/image";
import classNames from "classnames";
import { useAppDispatch } from "@/hooks/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postLoginUser, postToken } from "@/api/user";
import { setAuthState, setUserData } from "@/store/features/authSlice";

type SinginTipe = {
  email: string;
  password: string;
};

export default function Signin() {
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<SinginTipe>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = await postLoginUser(loginData);
      dispatch(setAuthState(true));
      dispatch(
        setUserData({
          username: userData.username,
          email: userData.email,
          id: userData.id,
        })
      );

      localStorage.setItem("user", JSON.stringify(userData));

      const tokenData = await postToken(loginData);
      localStorage.setItem(
        "token",
        JSON.stringify({ access: tokenData.access, refresh: tokenData.refresh })
      );
      dispatch(
        setUserData({ refresh: tokenData.refresh, access: tokenData.access })
      );

      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} onSubmit={handleSignin} action="#">
            <Link href="/">
              <div className={styles.modalLogo}>
                <Image
                  src="/image/logo_modal.png"
                  alt="логотип"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              onChange={handleInputChange}
              className={classNames(styles.modalInput, styles.login)}
              type="email"
              name="email"
              placeholder="Почта"
            />
            <input
              onChange={handleInputChange}
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <button className={styles.modalBtnEnter}>
              <a>Войти</a>
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
