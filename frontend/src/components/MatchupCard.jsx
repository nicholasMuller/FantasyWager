import React from "react";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "./MatchupCard.css";

const MatchupCard = ({ match }) => {
  const [value, setValue] = useState([]);
  const handleChange = (val) => setValue(val);

  return (
    <div className="matchup-card">
      {/* Home team row */}
      <div className="team-row">
        <div className="team-info">
          <img
            src={match.homeTeam.logo}
            alt={`${match.homeTeam.displayName} logo`}
            className="team-logo"
          />
          <h5 className="team-name">{match.homeTeam.displayName}</h5>
        </div>
        <div className="team-odds">
          <ToggleButtonGroup
            type="checkbox"
            value={value}
            onChange={handleChange}
            className="toggle-group"
          >
            <ToggleButton
              id={`${match.id}-hometeam-point-spread`}
              value={`${match.id}-1`}
              className="toggle-button"
            >
              {match.homeTeam.pointSpread} {match.homeTeam.spreadOdds}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-hometeam-money-line`}
              value={`${match.id}-3`}
              className="toggle-button"
            >
              ML {match.homeTeam.moneyLine}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-over`}
              value={`${match.id}-7`}
              className="toggle-button"
            >
              O {match.totals.overUnder} {match.totals.overOdds}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      {/* Away team row */}
      <div className="team-row">
        <div className="team-info">
          <img
            src={match.awayTeam.logo}
            alt={`${match.awayTeam.displayName} logo`}
            className="team-logo"
          />
          <h5 className="team-name">{match.awayTeam.displayName}</h5>
        </div>
        <div className="team-odds">
          <ToggleButtonGroup
            type="checkbox"
            value={value}
            onChange={handleChange}
            className="toggle-group"
          >
            <ToggleButton
              id={`${match.id}-awayteam-point-spread`}
              value={`${match.id}-5`}
              className="toggle-button"
            >
              {match.awayTeam.pointSpread} {match.awayTeam.spreadOdds}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-awayteam-money-line`}
              value={`${match.id}-6`}
              className="toggle-button"
            >
              ML {match.awayTeam.moneyLine}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-under`}
              value={`${match.id}-8`}
              className="toggle-button"
            >
              U {match.totals.overUnder} {match.totals.underOdds}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default MatchupCard;
