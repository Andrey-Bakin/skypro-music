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
  const [error, setError] = useState<string | null>(null);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setLoginData((prevFormData) =>{
      return {
        ...prevFormData, [name]: value
      }
    });
  };

  const validateForm = (e: React.MouseEvent<HTMLButtonElement>): boolean => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minimumPasswordLength = 8;
  
    if (!loginData.email || !loginData.password) {
      setError("Введите почту и пароль");
      return false;
    }
  
    if (!emailRegex.test(loginData.email)) {
      setError("Введите корректный адрес электронной почты");
      return false;
    }
  
    if (loginData.password.length < minimumPasswordLength) {
      setError(`Пароль должен содержать минимум ${minimumPasswordLength} символов`);
      return false;
    }
  
    return true;
  };
  

  async function handleSignin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validateForm(e)) return;
    
    try {
      await Promise.all([
        dispatch(getTokens(loginData)).unwrap(),
        dispatch(getUser(loginData)).unwrap(),
      ]);
      router.push("/");
    } catch (error: unknown) { // Используйте unknown вместо any
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Пользователь с таким email или паролем не найден');
      }
    }
  }
   
  console.log(error)

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
              autoComplete="email"
            />
            <input
              onChange={handleInputChange}
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Пароль"
              value={loginData.password}
              autoComplete="password"
            />
            {error && <p className={styles.error}>{error}</p>}
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
