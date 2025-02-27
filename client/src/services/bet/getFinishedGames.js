import axios from "axios";

export const getFinishedNBAGames = async () => {
  try {
    let response = await axios.get(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${getYesterdayDate()}`
    );

    const games = await response.data.events;

    return games
      .filter((game) => game.status.type.name == "STATUS_FINAL")
      .map((game) => ({
        gameId: game.id,
        homeTeam: game.competitions[0].competitors[0].team.displayName,
        awayTeam: game.competitions[0].competitors[1].team.displayName,
        homeScore: game.competitions[0].competitors[0].score,
        awayScore: game.competitions[0].competitors[1].score,
        homeTeamIsWinner: game.competitions[0].competitors[0].winner,
        awayTeamIsWinner: game.competitions[0].competitors[1].winner,
      }));
  } catch (error) {
    console.error("Error fetching finished games:", error);
    return [];
  }
};

// Get yesterday's date for API query
const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
  const day = String(yesterday.getDate()).padStart(2, "0"); // Ensure 2-digit day

  const formattedDate = `${year}${month}${day}`;
  return formattedDate;
};
