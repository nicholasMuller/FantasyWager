import axios from "axios";
import { getFinishedNBAGames } from "./getFinishedGames";

export const settleBets = async () => {
  try {
    const finishedGames = await getFinishedNBAGames();

    if (finishedGames.length === 0) {
      console.log("No finished games to settle.");
      return;
    }

    console.log(`Processing ${finishedGames.length} games...`);

    for (const game of finishedGames) {
      console.log(`Settling bets . . .`);

      try {
        const { data } = await axios.post("/api/users/settleBets", game, {
          headers: { "Content-Type": "application/json" },
        });

        console.log(`Bets settled for Game ID ${game.gameId}:`, data);
      } catch (error) {
        console.error(
          `Error settling bets for Game ID ${game.gameId}:`,
          error.response?.data?.message || error.message
        );
      }
    }
  } catch (error) {
    console.error("Error fetching finished NBA games:", error.message);
  }
};
