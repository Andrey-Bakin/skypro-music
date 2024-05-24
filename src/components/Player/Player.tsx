import PlayerControls from "../PlayerControls/PlayerControls";
import PlayerTrackNow from "../PlayerTrackNow/PlayerTrackNow";
import VolumeBar from "../VolumeBar/VolumeBar";
import styles from "./Player.module.css";

export default function Player() {
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress} />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <PlayerControls />
            <PlayerTrackNow />
          </div>
          <VolumeBar />
        </div>
      </div>
    </div>
  );
}
