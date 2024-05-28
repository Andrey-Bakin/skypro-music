"use client";
import { useState } from "react";
import styles from "./Filter.module.css";
import FilterItem from "./FilterItem/FilterItem";
// import { filters } from "./data";
import { TrackType } from "@/types";

type Props = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: Props) {
  const filters = [
    {
      title: "исполнителю",
      list: Array.from(new Set(tracks.map((track) => track.author))),
      value: "author",
    },
    {
      title: "году выпуска",
      list: ["По умолчанию", "Сгачала новые", "Сначала старые"],
      value: "release",
    },
    {
      title: "жанру",
      list: Array.from(new Set(tracks.map((track) => track.genre))),
      value: "genre",
    },
  ];

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <FilterItem
          key={filter.title}
          isOpened={activeFilter === filter.title}
          handleFilterClick={handleFilterClick}
          title={filter.title}
          list={filter.list}
        />
      ))}
    </div>
  );
}
