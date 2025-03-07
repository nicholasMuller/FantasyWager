import axios from "axios";
import { getFinishedGames } from "./getFinishedGames";

export const settleBets = async () => {
  try {
    const finishedGames = await getFinishedGames();

    if (finishedGames.length === 0) {
      console.log("No finished games to settle.");
      return;
    }

    const settlePromises = finishedGames.map(async (game) => {
      try {
        const { data } = await axios.post("/api/users/settleBets", game, {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error(
          `Error settling bets for Game ID ${game.gameId}, ${game.homeTeam} vs ${game.awayTeam}:`,
          error.response?.data?.message || error.message
        );
      }
    });

    await Promise.all(settlePromises);
    console.log("All bets settled.");
  } catch (error) {
    console.error("Error fetching games:", error.message);
  }
};
