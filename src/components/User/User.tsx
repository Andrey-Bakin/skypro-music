"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import styles from "./User.module.css";
import { logout } from "@/store/features/authSlice";
import { useEffect, useState } from "react";
import { useInitialLikedTracks } from "@/hooks/initLikes";

export default function User() {
  useInitialLikedTracks();
  const router = useRouter();
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

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
  };

  if (!isHydrated) {
    return null;
  }
  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{userName}</p>
      <div onClick={handleLogout} className={styles.sidebarIcon}>
        <svg>
          <use xlinkHref="/image/icon/sprite.svg#logout" />
        </svg>
      </div>
    </div>
  );
}
