import { ListGroup, Button } from "react-bootstrap";
import { Offcanvas } from "bootstrap";

const ShoppingCart = ({ selectedBets }) => {


  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasScrollingLabel">Your Bets</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {Object.keys(selectedBets).length > 0 ? (
          <ListGroup>
            {Object.entries(selectedBets).map(([matchId, bets]) =>
              bets.map((bet, index) => {
                
                return(
                <ListGroup.Item key={`${matchId}-${index}`}>
                  <strong>{bet}</strong>
                </ListGroup.Item>
              )})
            )}
          </ListGroup>
        ) : (
          <p>No bets selected.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
