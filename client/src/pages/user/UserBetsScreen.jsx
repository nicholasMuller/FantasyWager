import UserBetsCard from "../../components/betting/userBetsCard";
import { useGetBetsQuery } from "../../services/user/usersApiSlice";
const UserBetsScreen = () => {
  const { data: bets, isLoading, isError, error } = useGetBetsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Your Bets</h1>
      {bets.length === 0 ? (
        <p>You have no bets placed.</p>
      ) : (
        <div className="container">
          <div className="row">
            {bets.map((bet, index) => (
              <div className="col-md-4" key={index}>
                <UserBetsCard bet={bet} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBetsScreen;
