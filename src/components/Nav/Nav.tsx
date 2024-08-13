"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export default function Nav() {
  const isAuth = useAppSelector((state) => state.auth.user?.username);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>(false);
  function toggleMenu() {
    setIsOpenedMenu((prev) => !prev);
  }
  const tokens = useAppSelector((state) => state.auth.tokens);
  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  const isAuthTracks = () => {
    if (tokens.access) {
      router.push("/tracks/favorite");
    } else {
      alert("Авторизуйтесь");
    }
  };
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Link href="/">
          <Image
            alt="логотип скайпро музыка"
            className={styles.logoImage}
            src="/image/logo.png"
            width={113}
            height={17}
          />
        </Link>
      </div>
      <div
        data-testid="burger"
        onClick={toggleMenu}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpenedMenu && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li onClick={isAuthTracks} className={styles.menuItem}>
              Мой плейлист
            </li>
            <li onClick={handleLogout} className={styles.menuItem}>
              {isAuth ? "Выйти" : "Войти"}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
