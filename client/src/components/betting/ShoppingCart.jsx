import { ListGroup, Button } from "react-bootstrap";
import { Offcanvas } from "bootstrap";
import { useState, useEffect, useSelector } from "react";
import { usePlaceBetMutation } from "../../services/user/usersApiSlice";
import { settleBets } from "../../services/bet/settleBets";

const ShoppingCart = ({ selectedBets }) => {
  const [inputs, setInputs] = useState({});
  const [total, setTotal] = useState(0);
  const [placeBet, { isLoading: isPlacingBet }] = usePlaceBetMutation(); // Use the mutation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : 0, // Convert to number, default to 0
    }));
  };

  useEffect(() => {
    const sum = Object.values(inputs).reduce((acc, num) => acc + num, 0);
    setTotal(sum);
  }, [inputs]);

  const handleSubmit = async () => {
    try {
      // Loop through selected bets and construct bet data
      for (const [matchId, bets] of Object.entries(selectedBets)) {
        for (const bet of bets) {
          const betDetails = bet.split(",");
          let shortName, type, team, winDiff, spread, league;

          if (betDetails.length === 5) {
            [shortName, type, winDiff, spread, league] = betDetails;
            team = null;
          } else if (betDetails.length === 6) {
            [shortName, type, team, winDiff, spread, league] = betDetails;
          } else {
            console.log("Unexpected format:", bet);
            continue;
          }

          const wager = inputs[`${matchId}-${type}`] ?? null; // Attach wager if it exists

          const betData = {
            matchID: matchId,
            league: league,
            betType: type,
            team: team || null,
            winDiff: winDiff || null,
            odds: spread || null,
            wager,
          };

          console.log("Bet data object:", betData);
          await placeBet(betData).unwrap();
        }
      }

      alert("Bets placed successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to place bets.");
    }
  };

  // settleBets();

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasScrollingLabel">Bet Slip</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {Object.keys(selectedBets).length > 0 ? (
          <>
            <ListGroup>
              {Object.entries(selectedBets).map(([matchId, bets]) =>
                bets.map((bet, index) => {
                  const betDetails = bet.split(",");
                  let shortName, type, team, total, spread, league;

                  if (betDetails.length === 5) {
                    [shortName, type, total, spread, league] = betDetails;
                    team = null;
                  } else if (betDetails.length === 6) {
                    [shortName, type, team, total, spread, league] = betDetails;
                  } else {
                    console.log("Unexpected format:", bet);
                    return null;
                  }

                  return (
                    <ListGroup.Item key={`${matchId}-${index}`}>
                      <strong>{shortName}</strong>
                      <br />
                      <strong>Match ID: {matchId}</strong>
                      <br />
                      <strong>
                        {type} {team && team}
                      </strong>
                      <br />
                      <strong>
                        {total !== "0"
                          ? `${total} ${spread >= 0 ? `+${spread}` : spread}`
                          : spread >= 0
                          ? `+${spread}`
                          : spread}
                      </strong>

                      <div className="d-flex justify-content-end">
                        <input
                          type="number"
                          onChange={handleChange}
                          name={`${matchId}-${type}`}
                          value={inputs[`${matchId}-${type}`] || ""}
                          className="betCurrency w-25 border border-1 rounded"
                          placeholder="$0.00"
                        />
                      </div>
                    </ListGroup.Item>
                  );
                })
              )}
            </ListGroup>
            <div className="d-flex justify-content-start">
              <Button
                onClick={handleSubmit}
                variant="primary"
                disabled={isPlacingBet}
              >
                {isPlacingBet ? "Placing..." : "Submit Bets"}
              </Button>
            </div>
            <div className="d-flex justify-content-end">
              <h3 className="mt-4 text-lg font-semibold">Total: ${total}</h3>
            </div>
          </>
        ) : (
          <p>Bet slip is empty..</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
