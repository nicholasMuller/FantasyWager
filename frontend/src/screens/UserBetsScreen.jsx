import React from "react";
import { useGetBetsQuery } from "../slices/usersApiSlice";
const UserBetsScreen = () => {
  const { data: bets, isLoading, isError, error } = useGetBetsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  console.log(bets);
  return (
    <div>
      <h1>Your Bets</h1>
      {bets.length === 0 ? (
        <p>You have no bets placed.</p>
      ) : (
        <ul>
          {bets.map((bet, index) => (
            <li key={index}>
              <p>Match ID: {bet.matchID}</p>
              <p>Bet Type: {bet.betType}</p>
              <p>Team: {bet.team}</p>
              <p>Win Difference: {bet.winDiff}</p>
              <p>Odds: {bet.odds}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBetsScreen;
