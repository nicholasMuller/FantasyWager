import { oddsSliceNFL } from "../../slices/NFL/oddsSliceNFL";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MatchupCard from "../../components/MatchupCard";
const NFLOddsScreen = () => {
  const [matchups, setWeekData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function inside the effect
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

  // Display loading or error if necessary
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>NFL Odds Page</h1>
      <Container>
        <Row>
          {!loading &&
            matchups.map((match, index) => (
              <Col>
                <MatchupCard key={match.id} match={match} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default NFLOddsScreen;
