import { Choice, GameState } from "@/models/RockPaperScissors";

const choices: Choice[] = ["Kéo", "Búa", "Bao"];

export const getComputerChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

export const checkWinner = (userChoice: Choice, computerChoice: Choice): string => {
  if (userChoice === computerChoice) return "Hòa 🤝";
  if (
    (userChoice === "Kéo" && computerChoice === "Bao") ||
    (userChoice === "Búa" && computerChoice === "Kéo") ||
    (userChoice === "Bao" && computerChoice === "Búa")
  ) {
    return "Bạn thắng! 🎉";
  }
  return "Bạn thua! 😢";
};

export const initialGameState: GameState = {
  userChoice: null,
  computerChoice: null,
  result: "",
  history: [],
};
