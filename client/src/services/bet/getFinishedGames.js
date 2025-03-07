import axios from "axios";

export const getFinishedGames = async () => {
  let sports = { nba: "basketball", nfl: "football", nhl: "hockey" };

  try {
    // Fetch all responses concurrently
    const responses = await Promise.all(
      Object.entries(sports).map(([league, sport]) =>
        axios.get(
          `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard?dates=${getYesterdayDate()}`
        )
      )
    );

    // Extract games from each response
    let allGames = responses.flatMap((response) =>
      response.data.events
        .filter((game) => game.status.type.name === "STATUS_FINAL")
        .map((game) => ({
          gameId: game.id,
          homeTeam: game.competitions[0].competitors[0].team.displayName,
          awayTeam: game.competitions[0].competitors[1].team.displayName,
          homeScore: game.competitions[0].competitors[0].score,
          awayScore: game.competitions[0].competitors[1].score,
          homeTeamIsWinner: game.competitions[0].competitors[0].winner,
          awayTeamIsWinner: game.competitions[0].competitors[1].winner,
        }))
    );

    return allGames;
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
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};
