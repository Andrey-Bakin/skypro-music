import Nav from "@/components/Nav/Nav";
import styles from "./layout.module.css";
import SideBar from "@/components/SideBar/SideBar";
import Player from "@/components/Player/Player";
import Search from "@/components/Search/Search";

export default function TracksLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            <div className={styles.centerblockContent}>
              {children}
            </div>
          </div>
          <SideBar />
        </main>
        <Player />
        <footer className="footer" />
      </div>
    </div>
  );
}