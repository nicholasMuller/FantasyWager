import axios from "axios";
import getSingleLeagueEvent from "./getSingleLeagueEvent";

const getAllLeagueEvents = async (league, withOdds) => {
  //   console.log(league, withOdds);
  const events = await getWeeklyGameIds(league);
  let matchups = [];
  for (const eventId of events) {
    matchups.push(await getSingleLeagueEvent(eventId, league, withOdds));
  }

  return matchups;
};

// Gets all of the GameIds for the next 2 weeks. Returns an array of GameId strings
const getWeeklyGameIds = async (league) => {
  let sports = { nba: "basketball", nfl: "football", nhl: "hockey" };
  let weeklyEvents = [];
  let response = await axios.get(
    `http://sports.core.api.espn.com/v2/sports/${sports[league]}/leagues/${league}/events?lang=en&region=us`
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
  console.log(weeklyEvents);
  return weeklyEvents;
};

export default getAllLeagueEvents;
