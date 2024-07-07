"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import styles from "./User.module.css";
import { setAuthState, setUserData } from "@/store/features/authSlice";
import Link from "next/link";



export default function User() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.auth.userData);

  const logout = () => {
    dispatch(setAuthState(false));
    dispatch(setUserData(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{userName?.email}</p>
      <Link href="/signin">
        <div onClick={logout} className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/image/icon/sprite.svg#logout" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
