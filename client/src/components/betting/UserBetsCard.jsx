import "./MatchupCard.css"; // Reuse styling from MatchupCard

const UserBetsCard = ({ bet }) => {
  console.log(bet);
  return (
    <div className="matchup-card container border border-3 rounded m-3">
      <div className="row my-2">
        {/* <div className="col-6 d-flex justify-content-center align-items-center"> */}
        {/* <img
                src={`/logos/${bet.team.trim().replace(/\s+/g, "_")}.png`} // Example: " Houston Rockets" → "Houston_Rockets.png"
                alt={`${bet.team} logo`}
                className="team-logo img-fluid w-50"
              /> */}
        {/* </div> */}
        <div className="col-6 d-flex flex-column justify-content-center align-items-center">
          {bet.team && (
            <h5 className="team-name text-center">{bet.team.trim()}</h5>
          )}
          <p className="bet-type mb-1">
            <strong>Bet Type:</strong> {bet.betType}
          </p>
          <p className="odds mb-1">
            <strong>Odds:</strong> {bet.odds}
          </p>
          <p className="wager mb-1">
            <strong>Wager:</strong> ${bet.wager}
          </p>
          <p className="payout mb-1">
            <strong>Potential Payout:</strong> ${bet.potentialPayout}
          </p>
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
    </div>
  );
};

export default UserBetsCard;
