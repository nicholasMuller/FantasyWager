import React from "react";
import { useState } from "react";
import { ToggleButtonGroup, ToggleButton, Row, Col } from "react-bootstrap";
import "./MatchupCard.css";

const MatchupCard = ({ match }) => {
  const [value, setValue] = useState([]);
  const handleChange = (val) => setValue(val);

  return (
    <div className="matchup-card">
      <div className="odds-container">
        <div className="team-info">
          <img
            src={match.homeTeam.logo}
            alt={`${match.homeTeam.displayName} logo`}
            className="team-logo"
          />
          <h5 className="team-name">{match.homeTeam.displayName}</h5>
          <img
            src={match.awayTeam.logo}
            alt={`${match.awayTeam.displayName} logo`}
            className="team-logo"
          />
          <h5 className="team-name">{match.awayTeam.displayName}</h5>
        </div>
        <div className="team-info">
          <ToggleButtonGroup
            type="checkbox"
            value={value}
            onChange={handleChange}
          >
            <ToggleButton
              id={`${match.id}-hometeam-point-spread`}
              value={`${match.id}-1`}
            >
              {match.homeTeam.pointSpread} {match.homeTeam.spreadOdds}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-hometeam-money-line`}
              value={`${match.id}-3`}
            >
              ML {match.homeTeam.moneyLine}
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            type="checkbox"
            value={value}
            onChange={handleChange}
          >
            <ToggleButton
              id={`${match.id}-awayteam-point-spread`}
              value={`${match.id}-5`}
            >
              {match.awayTeam.pointSpread}
              {match.awayTeam.spreadOdds}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-awayteam-money-line`}
              value={`${match.id}-6`}
            >
              ML {match.awayTeam.moneyLine}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="over-under">
        <ToggleButtonGroup
          type="checkbox"
          value={value}
          onChange={handleChange}
        >
          <ToggleButton id={`${match.id}-over`} value={`${match.id}-7`}>
            O {match.totals.overUnder} {match.totals.overOdds}
          </ToggleButton>
          <ToggleButton id={`${match.id}-under`} value={`${match.id}-8`}>
            U {match.totals.overUnder} {match.totals.underOdds}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default MatchupCard;
