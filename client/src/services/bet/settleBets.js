import axios from "axios";
import { getFinishedNBAGames } from "./getFinishedGames";

export const settleBets = async () => {
  try {
    const finishedGames = await getFinishedNBAGames();

    if (finishedGames.length === 0) {
      console.log("No finished games to settle.");
      return;
    }

    const settlePromises = finishedGames.map(async (game) => {
      try {
        const { data } = await axios.post("/api/users/settleBets", game, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(data);
      } catch (error) {
        console.error(
          `Error settling bets for Game ID ${game.gameId}:`,
          error.response?.data?.message || error.message
        );
      }
    });

    await Promise.all(settlePromises);
    console.log("All bets settled.");
  } catch (error) {
    console.error("Error fetching finished NBA games:", error.message);
  }
};
