"use client";

import Link from "next/link";
import styles from "./Signin.module.css";
import Image from "next/image";
import classNames from "classnames";
import { useAppDispatch } from "@/hooks/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTokens, getUser } from "@/store/features/authSlice";

export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setLoginData((prevFormData) =>{
      return {
        ...prevFormData, [name]: value
      }
    });
  };

  const handleSignin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await Promise.all([
        dispatch(getTokens(loginData)).unwrap().then((data) => {
          localStorage.setItem("access", JSON.stringify(data.access));
          localStorage.setItem("refresh", JSON.stringify(data.refresh))
        }),
        dispatch(getUser(loginData)).unwrap().then((data) => {
          localStorage.setItem("user", JSON.stringify(data))
        })
      ])
      router.push("/")      
    } catch (error) {
      console.log(error)
    }
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
              value={loginData.email}
            />
            <input
              onChange={handleInputChange}
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Пароль"
              value={loginData.password}
            />
            <button className={styles.modalBtnEnter} onClick={handleSignin}>
              Войти
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
