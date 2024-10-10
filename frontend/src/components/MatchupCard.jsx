import React from 'react';
import './MatchupCard.css';

const MatchupCard = ({ match }) => {
    return (
        <div className="matchup-card">
            <h2 className="matchup-title">{match.homeTeam.displayName} vs {match.awayTeam.displayName}</h2>
            <div className="odds-container">
                <div className="team-info">
                    <img src={match.homeTeam.logo} alt={`${match.homeTeam.displayName} logo`} className="team-logo" />
                    <h3 className="team-name">{match.homeTeam.displayName}</h3>
                    <p className="team-odds">Odds: {match.homeTeam.spreadOdds}</p>
                    <p className="team-point-spread">Point Spread: {match.homeTeam.pointSpread}</p>
                    <p className="team-money-line">Money Line: {match.homeTeam.moneyLine}</p>
                </div>
                <div className="team-info">
                    <img src={match.awayTeam.logo} alt={`${match.awayTeam.displayName} logo`} className="team-logo" />
                    <h3 className="team-name">{match.awayTeam.displayName}</h3>
                    <p className="team-odds">Odds: {match.awayTeam.spreadOdds}</p>
                    <p className="team-point-spread">Point Spread: {match.awayTeam.pointSpread}</p>
                    <p className="team-money-line">Money Line: {match.awayTeam.moneyLine}</p>
                </div>
            </div>
            <div className="over-under">
                <p>Over/Under: {match.totals.overUnder}</p>
                <p>Over Odds: {match.totals.overOdds}</p>
                <p>Under Odds: {match.totals.underOdds}</p>
            </div>
        </div>
    );
};

export default MatchupCard;
