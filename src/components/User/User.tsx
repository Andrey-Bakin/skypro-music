"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import styles from "./User.module.css";
import { setAuthState, setUserData } from "@/store/features/authSlice";
import { useEffect, useState } from "react";
import { clearLikedTracks } from "@/store/features/playlistSlice";

export default function User() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isHidrated, setIsHidrated] = useState(false);
  const userName = useAppSelector((state) => state.auth.userData);
  
  useEffect(() =>{
    setIsHidrated(true);
  }, []);

  const logout = () => {
    dispatch(setAuthState(false));
    dispatch(setUserData(null));
    dispatch(clearLikedTracks());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/signin");
  };

  if (!isHidrated) {
    return null;
  }

  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{userName?.email}</p>
          <div onClick={logout} className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/image/icon/sprite.svg#logout" />
          </svg>
        </div>
    </div>
  );
}
