import CenterBlock from "@/components/CenterBlock/CenterBlock";
import styles from "./Main.module.css";
import Nav from "@/components/Nav/Nav";
import SideBar from "@/components/SideBar/SideBar";
import Player from "@/components/Player/Player";
import { TrackType } from "@/types";


type Props = {
    tracks: TrackType[];
}

export default function Main({tracks}:Props) {
  
  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav />
        <CenterBlock tracks={tracks} />
        <SideBar />
      </main>
      <Player />
      <footer className="footer" />
    </div>
  </div>
  );
}