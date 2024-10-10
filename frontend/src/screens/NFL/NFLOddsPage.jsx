import { oddsSliceNFL } from "../../slices/NFL/oddsSliceNFL";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"; // Import the Button component
import MatchupCard from "../../components/MatchupCard";

const NFLOddsScreen = () => {
  const [matchups, setWeekData] = useState([]);
  const [selectedBets, setSelectedBets] = useState({}); // Store selected bets for each match
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeekData = async () => {
      try {
        const weekData = await oddsSliceNFL();
        console.log("Received weekData:", weekData); // Check the structure here
        setWeekData(weekData); // Update the state with the fetched data
      } catch (error) {
        setError("Failed to load NFL week data");
      } finally {
        setLoading(false);
      }
    };

    getWeekData(); // Call the async function
  }, []);

  // Handle selection from a MatchupCard
  const handleSelection = (matchId, selectedValues) => {
    setSelectedBets((prevSelections) => ({
      ...prevSelections,
      [matchId]: selectedValues,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Selected Bets:", selectedBets); // Log all selected bets
  };

  // Display loading or error if necessary
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>NFL Odds Page</h1>

      {/* Submit Button */}
      <Button onClick={handleSubmit} variant="primary">
        Submit Bets
      </Button>

      <Container>
        <Row>
          {matchups.map((match) => (
            <Col key={match.id}>
              <MatchupCard
                match={match}
                onSelectionChange={handleSelection}
                selectedBets={selectedBets[match.id] || []} // Pass selected bets for each match
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default NFLOddsScreen;
