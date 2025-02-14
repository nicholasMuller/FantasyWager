import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';
import { useState } from "react";

const App = () => {
  const [selectedBets, setSelectedBets] = useState({});
  return (
    <>
      <Header />
      <ShoppingCart selectedBets={selectedBets}/>
      <ToastContainer />
      <Container className='my-2'>
        <Outlet context={[selectedBets, setSelectedBets]} />
      </Container>
    </>
  );
};

export default App;
