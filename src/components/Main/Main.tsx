"use client"

import CenterBlock from "@/components/CenterBlock/CenterBlock";
import styles from "./Main.module.css";
import Nav from "@/components/Nav/Nav";
import SideBar from "@/components/SideBar/SideBar";
import Player from "@/components/Player/Player";
import { TrackType } from "@/types";
import { useState } from "react";

type Props = {
    tracks: TrackType[];
}

export default function Main({tracks}:Props) {
  const [track, setTrack] = useState<TrackType | null>(null);
  
  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav />
        <CenterBlock tracks={tracks} setTrack={setTrack}/>
        <SideBar />
      </main>
      {track && <Player track={track}/>}
      <footer className="footer" />
    </div>
  </div>
  );
}