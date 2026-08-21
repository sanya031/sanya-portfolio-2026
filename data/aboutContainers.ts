import type { GridPlacement } from "../components/about/AboutContainer";

export type AboutContainerItem = {
  compactLabel?: string;
  id: string;
  label: string;
  desktop: GridPlacement;
  laptop: GridPlacement;
  tablet: GridPlacement;
  mobile: GridPlacement;
};

export const aboutContainers: AboutContainerItem[] = [
  {
    id: "hi-thats-me",
    label: "Hi, that's me :)",
    compactLabel: "Hi :)",
    desktop: { column: 4, row: 5, columns: 7, rows: 7 },
    laptop: { column: 5, row: 5, columns: 8, rows: 8 },
    tablet: { column: 4, row: 3, columns: 9, rows: 8 },
    mobile: { column: 4, row: 2, columns: 2, rows: 3 },
  },
  {
    id: "weekend-hobby",
    label: "Weekend Hobby",
    compactLabel: "Hobby",
    desktop: { column: 6, row: 13, columns: 6, rows: 8 },
    laptop: { column: 6, row: 14, columns: 7, rows: 9 },
    tablet: { column: 16, row: 12, columns: 7, rows: 9 },
    mobile: { column: 4, row: 7, columns: 2, rows: 4 },
  },
  {
    id: "archive",
    label: "Archive",
    desktop: { column: 13, row: 3, columns: 12, rows: 20 },
    laptop: { column: 14, row: 3, columns: 10, rows: 18 },
    tablet: { column: 3, row: 12, columns: 12, rows: 14 },
    mobile: { column: 1, row: 2, columns: 3, rows: 11 },
  },
  {
    id: "brain-food",
    label: "Brain Food",
    compactLabel: "Brain",
    desktop: { column: 26, row: 4, columns: 8, rows: 8 },
    laptop: { column: 25, row: 4, columns: 9, rows: 9 },
    tablet: { column: 14, row: 3, columns: 8, rows: 8 },
    mobile: { column: 3, row: 15, columns: 3, rows: 4 },
  },
  {
    id: "listening-to",
    label: "Listening to",
    compactLabel: "Listen",
    desktop: { column: 27, row: 13, columns: 8, rows: 3 },
    laptop: { column: 25, row: 14, columns: 10, rows: 4 },
    tablet: { column: 16, row: 22, columns: 7, rows: 3 },
    mobile: { column: 1, row: 15, columns: 2, rows: 4 },
  },
];
