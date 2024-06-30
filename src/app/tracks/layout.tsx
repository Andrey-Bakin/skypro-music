"use client"

import Nav from "@/components/Nav/Nav";
import styles from "./layout.module.css";
import SideBar from "@/components/SideBar/SideBar";
import Player from "@/components/Player/Player";
import Search from "@/components/Search/Search";
import Filter from "@/components/Filter/Filter";

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
            <h2 className={styles.centerblockH2}>Треки</h2>
            <div className={styles.centerblockContent}>
              <Filter />
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