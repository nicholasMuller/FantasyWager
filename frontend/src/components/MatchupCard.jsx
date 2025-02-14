import React from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "./MatchupCard.css";

const MatchupCard = ({ match, onSelectionChange, selectedBets }) => {
  const handleChange = (val) => {
    onSelectionChange(match.eventInfo.gameId, val);
  };

  const renderTeamRow = (teamType) => {
    const team = match.eventInfo.teams[teamType];
    const odds = match.odds[teamType];
    const isHomeTeam = teamType === "homeTeam";
    const matchShortName =  match.eventInfo.name

    return (
      <div className="team-row row my-2">
        <div className="team-info col-6">
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <img
                src={team.logo}
                alt={`${team.displayName} logo`}
                className="team-logo img-fluid w-50"
              />
            </div>
            <div className="col col d-flex text-center justify-content-center align-items-center">
              <div className="team-name">{team.displayName}</div>
            </div>
          </div>
        </div>
        <div className="team-odds col-6 d-flex text-center justify-content-center align-items-center">
          <ToggleButtonGroup
            type="checkbox"
            value={selectedBets || []}
            onChange={handleChange}
            className="toggle-group d-flex gap-1"
          >
            <ToggleButton
              id={`${match.eventInfo.gameId}-${teamType}-point-spread`}
              value={`${matchShortName} POINT_SPREAD ${team.displayName} ${odds.pointSpread} ${odds.spreadOdds}`}
              className="toggle-button"
            >
              {odds.pointSpread} {odds.spreadOdds}
            </ToggleButton>
            <ToggleButton
              id={`${match.eventInfo.gameId}-${teamType}-money-line`}
              value={`${matchShortName} ML ${team.abbreviation} 0 ${odds.moneyLine}`}
              className="toggle-button"
            >
              ML {odds.moneyLine}
            </ToggleButton>
            <ToggleButton
              id={`${match.eventInfo.gameId}-${teamType}-${
                isHomeTeam ? "over" : "under"
              }`}
              value={`${matchShortName} ${isHomeTeam ? "OVER" : "UNDER"} TOTAL ${
                match.odds.totals.overUnder
              } ${
                isHomeTeam
                  ? match.odds.totals.overOdds
                  : match.odds.totals.underOdds
              }`}
              className="toggle-button"
            >
              {isHomeTeam ? "O" : "U"} {match.odds.totals.overUnder}{" "}
              {isHomeTeam
                ? match.odds.totals.overOdds
                : match.odds.totals.underOdds}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  };

  return (
    <div className="matchup-card container border border-3 rounded m-3">
      {renderTeamRow("homeTeam")}
      {renderTeamRow("awayTeam")}
    </div>
  );
};

export default MatchupCard;
