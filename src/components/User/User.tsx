"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import styles from "./User.module.css";
import { getNewAccessToken, logout } from "@/store/features/authSlice";
import { useEffect, useState } from "react";
import { useInitialLikedTracks } from "@/hooks/initLikes";

export default function User() {
  useInitialLikedTracks();
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);
  const userName = useAppSelector((state) => state.auth.user?.username);
  const refreshToken = useAppSelector((state) => state.auth.tokens?.refresh);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  if (!userName) {
    return null;
  }

  async function getFreshAccess() {
    try {
      if (refreshToken) {
        await Promise.all([dispatch(getNewAccessToken(refreshToken)).unwrap()]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!isHydrated) {
    return null;
  }

  setInterval(() => getFreshAccess(), 199000);
  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{userName}</p>
      <div
        onClick={() => {
          dispatch(logout());
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
        className={styles.sidebarIcon}
      >
        <svg>
          <use xlinkHref="/image/icon/sprite.svg#logout" />
        </svg>
      </div>
    </div>
  );
}
