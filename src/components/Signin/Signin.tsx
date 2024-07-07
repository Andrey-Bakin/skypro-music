"use client";

import Link from "next/link";
import styles from "./Signin.module.css";
import Image from "next/image";
import classNames from "classnames";
import { useAppDispatch } from "@/hooks";
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

  const handleSignin = async () => {
    await postLoginUser(loginData)
      .then((data) => {
        dispatch(setAuthState(true));
        dispatch(
          setUserData({
            username: data.email,
            email: data.email,
            id: data.id,
          })
        );

        localStorage.setItem("user", JSON.stringify(data));
        postToken(loginData).then((data) => {
          localStorage.setItem("token", JSON.stringify(data.access));
          dispatch(setUserData({ refresh: data.refresh, access: data.sccess }));
          router.push("/");
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
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
            <button onClick={handleSignin} className={styles.modalBtnEnter}>
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
