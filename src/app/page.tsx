import CenterBlock from "@/components/CenterBlock/CenterBlock";
import styles from "./page.module.css";
import Nav from "@/components/Nav/Nav";
import SideBar from "@/components/SideBar/SideBar";
import Player from "@/components/Player/Player";

export default function Home() {
  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav />
        <CenterBlock />
        <SideBar />
      </main>
      <Player />
      <footer className="footer" />
    </div>
  </div>
  );
}
