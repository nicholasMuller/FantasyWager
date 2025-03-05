import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/layout/Header";
import ShoppingCart from "./components/betting/ShoppingCart";
import { useState } from "react";

const App = () => {
  const [selectedBets, setSelectedBets] = useState({});
  const [league, setLeague] = useState();
  return (
    <>
      <Header league={league} setLeague={setLeague} />
      <ShoppingCart selectedBets={selectedBets} />
      <ToastContainer />
      <Container className="my-2">
        <Outlet context={[selectedBets, setSelectedBets, league]} />
      </Container>
    </>
  );
};

export default App;
