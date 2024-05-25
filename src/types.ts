export type FilterItemType = {
    title: string;
    list: string[];
    handleFilterClick: (newFilter: string) => void;
    isOpened: boolean;
  };