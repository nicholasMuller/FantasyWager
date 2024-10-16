import { usePlaceBetMutation } from "../../slices/usersApiSlice";
import { getNFLEvents } from "../../slices/NFL/getNFLEvents";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"; // Import the Button component
import MatchupCard from "../../components/MatchupCard";

const NFLOddsScreen = () => {
  const [placeBet, { isLoading: isPlacingBet }] = usePlaceBetMutation(); // Use the mutation
  const [matchups, setWeekData] = useState([]);
  const [selectedBets, setSelectedBets] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeekData = async () => {
      try {
        const weekData = await getNFLEvents();
        setWeekData(weekData);
      } catch (error) {
        console.log(error);
        setError("Failed to load NFL week data");
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
        console.log(matchId, selectedBets[matchId]);
        const betData = {
          matchID: matchId,
          ...selectedBets[matchId],
        };
        // await placeBet(betData).unwrap();
      }
      alert("Bets placed successfully!");
    } catch (err) {
      alert("Failed to place bets.");
    }
  };

  if (loading || isPlacingBet) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // console.log(matchups);
  return (
    <div>
      <h1>NFL Odds Page</h1>
      <Button onClick={handleSubmit} variant="primary">
        Submit Bets
      </Button>
      <Container>
        <Row>
          {matchups.map(
            (match) =>
              match["eventInfo"]["status"] === "STATUS_SCHEDULED" && (
                <Col key={match["eventInfo"]["gameId"]}>
                  <MatchupCard
                    match={match}
                    onSelectionChange={handleSelection}
                    selectedBets={selectedBets[match.id] || []}
                  />
                </Col>
              )
          )}
        </Row>
      </Container>
    </div>
  );
};

export default NFLOddsScreen;
