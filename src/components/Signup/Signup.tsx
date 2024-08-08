"use client";

import Image from "next/image";
import styles from "./Signup.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postRegUser } from "@/api/user";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    repeatPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const validateForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !formData.email &&
      !formData.password &&
      !formData.username &&
      !formData.repeatPassword
    ) {
      setError("Введите имя, логин и пароль");
      return false;
    } else if (!formData.username) {
      setError("Введите имя");
      return false;
    } else if (!formData.email) {
      setError("Введите почту");
      return false;
    } else if (!formData.password) {
      setError("Введите пароль");
      return false;
    } else if (formData.password !== formData.repeatPassword) {
      setError("Пароли не совпадают");
      return false;
    }
    return true;
  };
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validateForm(e)) return;
    try {
      await postRegUser(formData);
      router.push("/signin");
    } catch (error: any) {
      if (error.status === 400) {
        const errorData = error.data;

        if (errorData.username) {
          setError(errorData.username[0]);
        } else if (errorData.email) {
          setError(errorData.email[0]);
        } else if (errorData.password) {
          const passwordErrors = errorData.password;

          if (
            passwordErrors.includes(
              "Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов."
            )
          ) {
            setError(
              "Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов."
            );
          } else if (
            passwordErrors.includes(
              "Введённый пароль слишком широко распространён."
            )
          ) {
            setError("Введённый пароль слишком широко распространён.");
          } else if (
            passwordErrors.includes("Введённый пароль состоит только из цифр.")
          ) {
            setError("Введённый пароль состоит только из цифр.");
          }
        }
      } else {
        setError("Не удалось зарегистрироваться. Попробуйте еще раз.");
      }
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
            <Link href="/">
              <div className={styles.modalLogo}>
                <Image
                  src="/image/logo_modal.png"
                  alt="logo"
                  width={256}
                  height={75}
                  priority
                />
              </div>
            </Link>
            <input
              className={styles.modalInput}
              type="text"
              name="username"
              placeholder="Имя"
              onChange={handleChange}
              autoComplete="username"
            />
            <input
              className={styles.modalInput}
              type="text"
              name="email"
              placeholder="Почта"
              onChange={handleChange}
              autoComplete="email"
            />
            <input
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleChange}
              autoComplete="password"
            />
            <input
              className={styles.modalInput}
              type="password"
              name="repeatPassword"
              placeholder="Повторите пароль"
              onChange={handleChange}
              autoComplete="newPassword"
            />
            {error && <p className={styles.error}>{error}</p>}

            <button onClick={handleSubmit} className={styles.modalBtnSignupEnt}>
              <a>Зарегистрироваться</a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;