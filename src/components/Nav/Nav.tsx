"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setAuthState, setUserData } from "@/store/features/authSlice";

export default function Nav() {
  const logged = useAppSelector((state) => state.auth.authState);
  const dispatch = useAppDispatch();
  const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>(false);
  function toggleMenu() {
    setIsOpenedMenu((prev) => !prev);
  }

  const logout = () => {
    dispatch(setAuthState(false));
    dispatch(setUserData(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
      <div data-testid="burger" onClick={toggleMenu} className={styles.navBurger}>
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
            <li className={styles.menuItem}>
              <Link href="/tracks/favorite" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link onClick={logout} href="/signin" className={styles.menuLink}>
                {logged ? "Выйти" : "Войти"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
