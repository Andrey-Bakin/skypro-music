import Filter from "../Filter/Filter";
import PlaylistHeader from "../PlaylistHeder/PlaylistHeader";
import Search from "../Search/Search";
import Track from "../Track/Track";
import styles from "./CenterBlock.module.css";
import { TrackType } from "@/types";

type Props = {
  tracks: TrackType[];
};

export default async function CenterBlock({ tracks }: Props) {
  
  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblockContent}>
        <PlaylistHeader />
        <div className={styles.contentPlaylist}>
          {tracks.map((trackData) => (
            <Track
              key={trackData.id}
              id={trackData.id}
              name={trackData.name}
              author={trackData.author}
              release_date={trackData.release_date}
              genre={trackData.genre}
              duration_in_seconds={trackData.duration_in_seconds}
              album={trackData.album}
              logo={trackData.logo}
              track_file={trackData.track_file}
              stared_user={trackData.stared_user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
