import axios from 'axios';

export const oddsSliceNFL = async () => {
  try {
    // Make a GET request to retrieve NFL weekly data
    const response = await axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
    
    // Initialize an array to hold game data
    const matchups = [];

    // Check if the response contains events and process each game
    if (response.data && response.data["events"]) {
      for (const event of response.data["events"]) {
        const gameID = event["id"];

        try {
          // Fetch odds for the current game
          const oddsResponse = await axios.get(`http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${gameID}/competitions/${gameID}/odds?lang=en&region=us`);
          const oddsData = oddsResponse.data["items"][0];

          // Fetch home team details from $ref
          const homeTeamRefUrl = oddsData.homeTeamOdds.team.$ref;
          const homeTeamResponse = await axios.get(homeTeamRefUrl);
          const homeTeamData = homeTeamResponse.data;

          // Fetch away team details from $ref
          const awayTeamRefUrl = oddsData.awayTeamOdds.team.$ref;
          const awayTeamResponse = await axios.get(awayTeamRefUrl);
          const awayTeamData = awayTeamResponse.data;

          // Structure the data
          const matchup = {
            totals: {
              overUnder: oddsData.overUnder || null,
              overOdds: oddsData.overOdds || null,
              underOdds: oddsData.underOdds || null,
            },
            homeTeam: {
              displayName: homeTeamData.displayName || null,
              abbreviation: homeTeamData.abbreviation || null,
              shortDisplayName: homeTeamData.shortDisplayName || null,
              logo: homeTeamData.logos?.[0]?.href || null,
              spreadOdds: oddsData.homeTeamOdds.spreadOdds || null,
              pointSpread: oddsData.homeTeamOdds.open?.pointSpread?.american || null,
              moneyLine: oddsData.homeTeamOdds.open?.moneyLine?.american || null,
            },
            awayTeam: {
              displayName: awayTeamData.displayName || null,
              abbreviation: awayTeamData.abbreviation || null,
              shortDisplayName: awayTeamData.shortDisplayName || null,
              logo: awayTeamData.logos?.[0]?.href || null,
              spreadOdds: oddsData.awayTeamOdds.spreadOdds || null,
              pointSpread: oddsData.awayTeamOdds.open?.pointSpread?.american || null,
              moneyLine: oddsData.awayTeamOdds.open?.moneyLine?.american || null,
            },
          };

          // Add this game data to the matchups array
          matchups.push(matchup);
        } catch (error) {
          console.error(`Error retrieving odds or team details for game ID: ${gameID}`, error);
        }
      }
    }

    // Return the collected matchups data
    return matchups;
  } catch (error) {
    console.error('Error retrieving weekly NFL data:', error);
    return [];
  }
};
