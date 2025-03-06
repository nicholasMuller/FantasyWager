import axios from "axios";

const getSingleLeagueEvent = async (eventId, league, withOdds) => {
  let sports = { nba: "basketball", nfl: "football", nhl: "hockey" };
  let eventResponse = await axios.get(
    `http://sports.core.api.espn.com/v2/sports/${sports[league]}/leagues/${league}/events/${eventId}?lang=en&region=us`
  );
  eventResponse = eventResponse.data;

  const status = await axios.get(
    eventResponse["competitions"][0]["status"]["$ref"]
  );

  const season = await axios.get(eventResponse["seasonType"]["$ref"]);

  const homeTeamGeneral = await axios.get(
    eventResponse["competitions"][0]["competitors"][0]["team"]["$ref"]
  );
  const homeTeamRecord = await axios.get(
    eventResponse["competitions"][0]["competitors"][0]["record"]["$ref"]
  );
  const awayTeamGeneral = await axios.get(
    eventResponse["competitions"][0]["competitors"][1]["team"]["$ref"]
  );
  const awayTeamRecord = await axios.get(
    eventResponse["competitions"][0]["competitors"][1]["record"]["$ref"]
  );

  const matchup = {
    eventInfo: {
      gameId: eventId || null,
      sport: sports[league],
      league: league,
      name: eventResponse["name"],
      status: status.data["type"]["name"],
      season: {
        type: season.data["name"],
        week: season.data["week"]["number"],
      },
      teams: {
        homeTeam: {
          displayName: homeTeamGeneral.data["displayName"],
          abbreviation: homeTeamGeneral.data["abbreviation"],
          logo: homeTeamGeneral.data["logos"][0]["href"],
          record: homeTeamRecord.data["items"][0]["summary"],
        },
        awayTeam: {
          displayName: awayTeamGeneral.data["displayName"],
          abbreviation: awayTeamGeneral.data["abbreviation"],
          logo: awayTeamGeneral.data["logos"][0]["href"],
          record: awayTeamRecord.data["items"][0]["summary"],
        },
      },
    },
  };

  if (withOdds) {
    let oddsResponse = await axios.get(
      `http://sports.core.api.espn.com/v2/sports/${sports[league]}/leagues/${league}/events/${eventId}/competitions/${eventId}/odds?lang=en&region=us`
    );
    oddsResponse = oddsResponse.data;

    Object.assign(matchup, {
      odds: {
        totals: {
          overUnder: oddsResponse["items"][0]["overUnder"] || null,
          overOdds: oddsResponse["items"][0]["overOdds"] || null,
          underOdds: oddsResponse["items"][0]["underOdds"] || null,
        },
        homeTeam: {
          moneyLine: oddsResponse["items"][0]["homeTeamOdds"]["moneyLine"],
          spreadOdds: oddsResponse["items"][0]["homeTeamOdds"]["spreadOdds"],
          pointSpread:
            oddsResponse["items"][0]["homeTeamOdds"]["current"]["pointSpread"][
              "american"
            ],
        },
        awayTeam: {
          moneyLine: oddsResponse["items"][0]["awayTeamOdds"]["moneyLine"],
          spreadOdds: oddsResponse["items"][0]["awayTeamOdds"]["spreadOdds"],
          pointSpread:
            oddsResponse["items"][0]["awayTeamOdds"]["current"]["pointSpread"][
              "american"
            ],
        },
      },
    });
  }
  return matchup;
};

export default getSingleLeagueEvent;
