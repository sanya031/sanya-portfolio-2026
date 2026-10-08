// Petal colour pairs for the footer's click-to-create motifs: a lighter fill with a darker
// outline in the same hue. Red and pink match the original motif SVGs; the rest are matched by
// eye to the Figma colour row (Home Page Redo, node 60-696) until exact values are swapped in.
export type MotifColour = { name: string; fill: string; outline: string };

export const MOTIF_GOLD = "#AB9B29";

export const MOTIF_PALETTE: MotifColour[] = [
  { name: "red-orange", fill: "#CB5434", outline: "#913A23" },
  { name: "pink", fill: "#F195A2", outline: "#A44D59" },
  { name: "cobalt", fill: "#4A62E8", outline: "#2A3B9E" },
  { name: "periwinkle", fill: "#7C74EC", outline: "#4A42A8" },
  { name: "violet", fill: "#A257DE", outline: "#69309A" },
  { name: "red", fill: "#E2373D", outline: "#9A1F24" },
  { name: "magenta", fill: "#E04FA6", outline: "#9C2A6C" },
  { name: "green", fill: "#4F9B32", outline: "#2F621B" },
  { name: "orange", fill: "#F0912C", outline: "#A65C12" },
  { name: "coral", fill: "#F07A64", outline: "#A9483A" },
];
