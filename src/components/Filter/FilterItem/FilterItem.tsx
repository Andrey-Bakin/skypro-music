import classNames from "classnames";
import styles from "./FilterItem.module.css";
import { FilterItemType } from "@/types";

export default function FilterItem({
  handleFilterClick,
  title,
  list,
  isOpened,
}: FilterItemType) {
  return (
    <>
      {isOpened ? (
        <div>
          <div
            onClick={() => handleFilterClick(title)}
            className={classNames(styles.filterButton, styles.activeFilter)}
          >
            {title}
          </div>
          <div className={styles.listContainer}>
            <ul className={styles.listBox}>
              {list.map((item) => (
                <li key={item} className={styles.listText}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          onClick={() => handleFilterClick(title)}
          className={classNames(styles.filterButton, styles.btnText)}
        >
          {title}
        </div>
      )}
    </>
  );
}