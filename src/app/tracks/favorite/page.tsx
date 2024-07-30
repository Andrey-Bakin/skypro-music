"use client";

import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppSelector } from "@/hooks/hooks";
import styles from "../layout.module.css";
import { useEffect, useState } from "react";

export default function FavoriteTracksPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
    
  const tracks = useAppSelector((state) => state.playlist.likedTracks);
 
  return (
    <div >
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <CenterBlock
        tracks={tracks}
        playlist={tracks}
        isFavorite={true}
        isLoading={isLoading}
      />
    </div>
  );
}
