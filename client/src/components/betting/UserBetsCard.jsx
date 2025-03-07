import "./MatchupCard.css"; // Reuse styling from MatchupCard
import getSingleLeagueEvent from "../../services/bet/getSingleLeagueEvent";
import { useEffect, useState } from "react";
const UserBetsCard = ({ bet }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matchup, setMatchup] = useState(null);

  useEffect(() => {
    const getEventInfo = async () => {
      try {
        const data = await getSingleLeagueEvent(bet.matchID, bet.league, false);
        setMatchup(data);
      } catch (error) {
        console.log(error);
        setError("Error fetching getEventInfo in UserBetsCard");
      } finally {
        setLoading(false);
      }
    };
    getEventInfo();
  }, [bet.matchID, bet.league]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <>
        <p className="display-4 d-flex justify-content-center align-items-center">
          {error}
        </p>
      </>
    );
  }

  if (matchup) {
    var matchupText = matchup.eventInfo.name;
    var homeTeam = matchup.eventInfo.teams["homeTeam"];
    var awayTeam = matchup.eventInfo.teams["awayTeam"];
  }

  // console.log(matchInfo);
  return (
    <div className="matchup-card container border border-3 rounded m-3">
      <div className="row my-2">
        <div className="col-6 d-flex justify-content-center align-items-center mb-1">
          <img
            src={homeTeam.logo}
            alt={`${homeTeam.displayName} logo`}
            className="team-logo img-fluid w-50 mx-1"
          />
          <img
            src={awayTeam.logo}
            alt={`${homeTeam.displayName} logo`}
            className="team-logo img-fluid w-50 mx-1"
          />
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <p
            className={`status text-center text-${
              bet.status === "won"
                ? "success"
                : bet.status === "lost"
                ? "danger"
                : "secondary"
            }`}
          >
            <strong>Status:</strong> {bet.status.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="row my-2">
        <div className="col d-flex flex-column justify-content-center align-items-center"></div>
        {bet.team ? (
          <p className="spread mb-1">
            <strong>
              {bet.team.trim()} {bet.winDiff} {bet.odds}
            </strong>
          </p>
        ) : (
          <p className="bet-type mb-1">
            <strong>
              {bet.betType} {bet.odds}
            </strong>
          </p>
        )}
        <p className="wager mb-1">
          <strong>Wager: ${bet.wager}</strong>
        </p>
        <p className="payout mb-1 text-end">
          <strong>Potential Payout: ${bet.potentialPayout}</strong>
        </p>
      </div>
    </div>
  );
};

export default UserBetsCard;
