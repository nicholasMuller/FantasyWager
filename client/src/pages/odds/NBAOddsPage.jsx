import { getNBAEvents } from "../../services/bet/getNBAEvents";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext
import NBANewsPage from "../news/NBANewsPage";
import MatchupCard from "../../components/betting/MatchupCard";

const NBAOddsScreen = () => {
  const [matchups, setWeekData] = useState([]);
  const [selectedBets, setSelectedBets] = useOutletContext(); // Get state from App.js
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeekData = async () => {
      try {
        const weekData = await getNBAEvents();
        setWeekData(weekData);
      } catch (error) {
        console.log(error);
        setError("There are no games to bet on right now . . .");
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

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <>
        <p className="display-4 d-flex justify-content-center align-items-center">
          {error}
        </p>
        <NBANewsPage />
      </>
    );
  }

  // console.log(matchups);
  return (
    <div>
      <h1>NBA Odds Page</h1>

      <div className="container">
        <div className="row">
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
