import React from "react";
import { ToggleButtonGroup, ToggleButton, Row, Col } from "react-bootstrap";
import "./MatchupCard.css";

const MatchupCard = ({ match, onSelectionChange, selectedBets }) => {
  const handleChange = (val) => {
    onSelectionChange(match["eventInfo"]["gameId"], val); // Notify parent when selection changes
  };

  return (
    <div className="matchup-card">
      <div className="team-row">
        <div className="team-info">
          <img
            src={match["eventInfo"]["teams"]["homeTeam"]["logo"]}
            alt={`${match["eventInfo"]["teams"]["homeTeam"]["displayName"]} logo`}
            className="team-logo"
          />
          <span className="team-name">
            {match["eventInfo"]["teams"]["homeTeam"]["displayName"]}
          </span>
        </div>
        <div className="team-odds">
          <ToggleButtonGroup
            type="checkbox"
            value={selectedBets} // Use selectedBets from props
            onChange={handleChange}
            className="toggle-group"
          >
            <ToggleButton
              id={`${match["eventInfo"]["gameId"]}-hometeam-point-spread`}
              value={`POINT_SPREAD ${match["eventInfo"]["teams"]["homeTeam"]["abbreviation"]} ${match["odds"]["homeTeam"]["pointSpread"]} ${match["odds"]["homeTeam"]["spreadOdds"]}`}
              className="toggle-button"
            >
              {match["odds"]["homeTeam"]["pointSpread"]}{" "}
              {match["odds"]["homeTeam"]["spreadOdds"]}
            </ToggleButton>
            <ToggleButton
              id={`${match["eventInfo"]["gameId"]}-hometeam-money-line`}
              value={`ML ${match["eventInfo"]["teams"]["homeTeam"]["abbreviation"]} 0 ${match["odds"]["homeTeam"]["moneyLine"]}`}
              className="toggle-button"
            >
              ML {match["odds"]["homeTeam"]["moneyLine"]}
            </ToggleButton>
            <ToggleButton
              id={`${match["eventInfo"]["gameId"]}-over`}
              value={`OVER TOTAL ${match["odds"]["totals"]["overUnder"]} ${match["odds"]["totals"]["overOdds"]}`}
              className="toggle-button"
            >
              O {match["odds"]["totals"]["overUnder"]}{" "}
              {match["odds"]["totals"]["overOdds"]}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <div className="team-row">
        <div className="team-info">
          <img
            src={match["eventInfo"]["teams"]["awayTeam"]["logo"]}
            alt={`${match["eventInfo"]["teams"]["awayTeam"]["displayName"]} logo`}
            className="team-logo"
          />
          <span className="team-name">
            {match["eventInfo"]["teams"]["awayTeam"]["displayName"]}
          </span>
        </div>
        <div className="team-odds">
          <ToggleButtonGroup
            type="checkbox"
            value={selectedBets}
            onChange={handleChange}
            className="toggle-group"
          >
            <ToggleButton
              id={`${match["eventInfo"]["gameId"]}-awayteam-point-spread`}
              value={`POINT_SPREAD ${match["eventInfo"]["teams"]["awayTeam"]["abbreviation"]} ${match["odds"]["awayTeam"]["pointSpread"]} ${match["odds"]["awayTeam"]["spreadOdds"]}`}
              className="toggle-button"
            >
              {match["odds"]["awayTeam"]["pointSpread"]}{" "}
              {match["odds"]["awayTeam"]["spreadOdds"]}
            </ToggleButton>
            <ToggleButton
              id={`${match["eventInfo"]["gameId"]}-awayteam-money-line`}
              value={`ML ${match["eventInfo"]["teams"]["awayTeam"]["abbreviation"]} 0 ${match["odds"]["awayTeam"]["moneyLine"]}`}
              className="toggle-button"
            >
              ML {match["odds"]["awayTeam"]["moneyLine"]}
            </ToggleButton>
            <ToggleButton
              id={`${match["eventInfo"]["gameId"]}-under`}
              value={`UNDER TOTAL ${match["odds"]["totals"]["overUnder"]} ${match["odds"]["totals"]["underOdds"]}`}
              className="toggle-button"
            >
              U {match["odds"]["totals"]["overUnder"]}{" "}
              {match["odds"]["totals"]["underOdds"]}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default MatchupCard;
