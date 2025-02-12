import { usePlaceBetMutation } from "../../slices/usersApiSlice";
import { getNBAEvents } from "../../slices/NBA/getNBAEvents";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import MatchupCard from "../../components/MatchupCard";

const NBAOddsScreen = () => {
  const [placeBet, { isLoading: isPlacingBet }] = usePlaceBetMutation(); // Use the mutation
  const [matchups, setWeekData] = useState([]);
  const [selectedBets, setSelectedBets] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeekData = async () => {
      try {
        const weekData = await getNBAEvents();
        setWeekData(weekData);
      } catch (error) {
        console.log(error);
        setError("Failed to load NBA week data");
      } finally {
        setLoading(false);
      }
    };

    getWeekData();
  }, []);

  const handleSelection = (matchId, selectedValues) => {
    setSelectedBets((prevSelections) => ({
      ...prevSelections,
      [matchId]: selectedValues,
    }));
  };

  const handleSubmit = async () => {
    try {
      for (const matchId in selectedBets) {
        const matches = selectedBets[matchId];

        for (const match of matches) {
          console.log("Original match string:", match);

          const parts = match.split(" ");
          if (parts.length !== 4) {
            console.log("Unexpected format:", match);
            continue;
          }

          const [betType, team, winDiff, odds] = parts;

          const betData = {
            matchID: matchId,
            betType: betType,
            team: team,
            winDiff: winDiff,
            odds: odds,
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

  if (loading || isPlacingBet) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // console.log(matchups);
  return (
    <div>
      <h1>NBA Odds Page</h1>
      <Button onClick={handleSubmit} variant="primary">
        Submit Bets
      </Button>
      <div className="container">
        <div className="row row-cols-2">
          {matchups.map(
            (match) =>
              match["eventInfo"]["status"] === "STATUS_SCHEDULED" && (
                <div className="col" key={match["eventInfo"]["gameId"]}>
                  <MatchupCard
                    match={match}
                    onSelectionChange={handleSelection}
                    selectedBets={
                      selectedBets[match["eventInfo"]["gameId"]] || []
                    }
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default NBAOddsScreen;
