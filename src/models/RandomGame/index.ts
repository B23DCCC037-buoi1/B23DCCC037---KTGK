import { useState } from "react";
import { GameState } from "@/services/RadomGame"; 

export const useRandomGame = () => {
  const initialGame: GameState = {
    targetNumber: Math.floor(Math.random() * 100) + 1,
    attempts: 10,
    gameOver: false,
    message: "",
  };

  const [game, setGame] = useState(initialGame);
  const [guess, setGuess] = useState("");

  const checkGuess = () => {
    if (game.gameOver) return;

    const userGuess = parseInt(guess);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setGame({ ...game, message: "⚠ Hãy nhập số từ 1 - 100!" });
      return;
    }

    let newMessage = "";
    if (userGuess < game.targetNumber) newMessage = "📉 Bạn đoán quá thấp!";
    else if (userGuess > game.targetNumber) newMessage = "📈 Bạn đoán quá cao!";
    else {
      newMessage = "🎉 Chúc mừng! Bạn đã đoán đúng!";
      setGame({ ...game, message: newMessage, gameOver: true });
      return;
    }

    const newAttempts = game.attempts - 1;
    if (newAttempts === 0) {
      newMessage = `💀 Bạn đã hết lượt! Số đúng là ${game.targetNumber}.`;
      setGame({ ...game, message: newMessage, gameOver: true });
      return;
    }

    setGame({ ...game, message: newMessage, attempts: newAttempts });
  };

  const resetGame = () => {
    setGame(initialGame);
    setGuess("");
  };

  return {
    game,
    guess,
    setGuess,
    checkGuess,
    resetGame,
  };
};
