import styles from "./PlaylistHeader.module.css";
import classNames from "classnames";
export default function PlaylistHeader() {
  return (
    <div className={styles.playlistTitleContent}>
      <div className={classNames(styles.playlistTitleColumn, styles.column01)}>
        Трек
      </div>
      <div className={classNames(styles.playlistTitleColumn, styles.column02)}>
        Исполнитель
      </div>
      <div className={classNames(styles.playlistTitleColumn, styles.column03)}>
        Альбом
      </div>
      <div className={classNames(styles.playlistTitleColumn, styles.column04)}>
        <svg className={styles.playlistTitleSvg}>
          <use xlinkHref="/image/icon/sprite.svg#icon-watch" />
        </svg>
      </div>
    </div>
  );
}