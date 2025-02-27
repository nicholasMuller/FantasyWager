import Hero from "../components/layout/Hero";
import { useSelector } from "react-redux";
import { Container, Card } from "react-bootstrap";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo ? (
        <>
          <div className=" py-5">
            <Container className="d-flex justify-content-center">
              <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                <h1 className="text-center mb-4">Fantasy Wager</h1>
                <p className="text-center mb-4">
                  Real games, fake money, ultimate bragging rights. .
                </p>
              </Card>
            </Container>
          </div>
        </>
      ) : (
        <Hero />
      )}
    </>
  );
};

export default HomeScreen;
