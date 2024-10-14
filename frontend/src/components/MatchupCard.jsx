import React from "react";
import { ToggleButtonGroup, ToggleButton, Row, Col } from "react-bootstrap";
import "./MatchupCard.css";

const MatchupCard = ({ match, onSelectionChange, selectedBets }) => {
  const handleChange = (val) => {
    onSelectionChange(match.id, val); // Notify parent when selection changes
  };

  return (
    <div className="matchup-card">
      <div className="team-row">
        <div className="team-info">
          <img
            src={match.homeTeam.logo}
            alt={`${match.homeTeam.displayName} logo`}
            className="team-logo"
          />
          <span className="team-name">{match.homeTeam.displayName}</span>
        </div>
        <div className="team-odds">
          <ToggleButtonGroup
            type="checkbox"
            value={selectedBets} // Use selectedBets from props
            onChange={handleChange}
            className="toggle-group"
          >
            <ToggleButton
              id={`${match.id}-hometeam-point-spread`}
              value={`POINT_SPREAD ${match.homeTeam.abbreviation} ${match.homeTeam.pointSpread} ${match.homeTeam.spreadOdds}`}
              className="toggle-button"
            >
              {match.homeTeam.pointSpread} {match.homeTeam.spreadOdds}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-hometeam-money-line`}
              value={`ML ${match.homeTeam.abbreviation} 0 ${match.homeTeam.moneyLine}`}
              className="toggle-button"
            >
              ML {match.homeTeam.moneyLine}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-over`}
              value={`OVER TOTAL ${match.totals.overUnder} ${match.totals.overOdds}`}
              className="toggle-button"
            >
              O {match.totals.overUnder} {match.totals.overOdds}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <div className="team-row">
        <div className="team-info">
          <img
            src={match.awayTeam.logo}
            alt={`${match.awayTeam.displayName} logo`}
            className="team-logo"
          />
          <span className="team-name">{match.awayTeam.displayName}</span>
        </div>
        <div className="team-odds">
          <ToggleButtonGroup
            type="checkbox"
            value={selectedBets}
            onChange={handleChange}
            className="toggle-group"
          >
            <ToggleButton
              id={`${match.id}-awayteam-point-spread`}
              value={`POINT_SPREAD ${match.awayTeam.abbreviation} ${match.awayTeam.pointSpread} ${match.awayTeam.spreadOdds}`}
              className="toggle-button"
            >
              {match.awayTeam.pointSpread} {match.awayTeam.spreadOdds}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-awayteam-money-line`}
              value={`ML ${match.homeTeam.abbreviation} 0 ${match.awayTeam.moneyLine}`}
              className="toggle-button"
            >
              ML {match.awayTeam.moneyLine}
            </ToggleButton>
            <ToggleButton
              id={`${match.id}-under`}
              value={`UNDER TOTAL ${match.totals.overUnder} ${match.totals.underOdds}`}
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
