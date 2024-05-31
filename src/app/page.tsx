import CenterBlock from "@/components/CenterBlock/CenterBlock";
import styles from "./page.module.css";
import Nav from "@/components/Nav/Nav";
import SideBar from "@/components/SideBar/SideBar";
import Player from "@/components/Player/Player";
import { TrackType } from "@/types";
import { getTracks } from "@/api/tracks";

export default async function Home() {
  const tracks: TrackType[] = await getTracks();
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
