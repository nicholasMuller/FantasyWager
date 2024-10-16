import { current } from "@reduxjs/toolkit";
import axios from "axios";

export const getNFLEvents = async () => {
  const events = await getWeeklyGameIds();
  let matchups = [];
  for (const eventId of events) {
    let eventResponse = await axios.get(
      `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${eventId}?lang=en&region=us`
    );
    eventResponse = eventResponse.data;
    let oddsResponse = await axios.get(
      `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${eventId}/competitions/${eventId}/odds?lang=en&region=us`
    );
    oddsResponse = oddsResponse.data;

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
    };
    matchups.push(matchup);
  }

  return matchups;
};

// Gets all of the GameIds for the next 2 weeks. Returns an array of GameId strings
const getWeeklyGameIds = async () => {
  let response = await axios.get(
    "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/"
  );
  const currentWeek = response.data["season"]["type"]["week"]["number"];
  const nextWeek = currentWeek + 1;

  const displayWeeks = [currentWeek];

  let weeklyEvents = [];

  for (let week of displayWeeks) {
    response = await axios.get(
      `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/types/2/weeks/${week}/events?lang=en&region=us`
    );
    let regex = /[0-9]+/g; // Use the global flag to find all matches in the string

    for (const event of response.data["items"]) {
      let matches = event["$ref"].match(regex); // Get all matches
      if (matches) {
        // Filter numbers that are exactly 9 digits long and convert them to numbers
        let filteredMatches = matches
          .filter((num) => num.length === 9)
          .map(Number);
        weeklyEvents.push(...filteredMatches); // Add them to the array
      }
    }
  }

  return weeklyEvents;
};
