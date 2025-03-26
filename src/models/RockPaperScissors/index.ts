export type Choice = "Kéo" | "Búa" | "Bao";

export interface GameState {
  userChoice: Choice | null;
  computerChoice: Choice | null;
  result: string;
  history: { user: Choice; computer: Choice; result: string }[];
}
