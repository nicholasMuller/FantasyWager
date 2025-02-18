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
        <h5 id="offcanvasScrollingLabel">Bet Slip</h5>
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
                
                const betDetails = bet.split(",")
                if(betDetails.length == 3){
                  var [type, total, spread] = betDetails
                  console.log(type, total, spread)
                }
                else if (betDetails.length == 4){
                  var [type, team, total, spread] = betDetails
                  console.log(type, team, total, spread)
                }
                return(
              
                <ListGroup.Item key={`${matchId}-${index}`}>
                  <strong>Match ID: {matchId}</strong><br />
                  <strong>{type}{team && team}</strong><br />
                  <strong>
                    {total != 0 
                      ? `${total} ${spread >= 0 ? `+${spread}` : spread}` 
                      : spread >= 0 ? `+${spread}` : spread}
                  </strong>
                  
                </ListGroup.Item>
              )})
            )}
          </ListGroup>
        ) : (
          <p>Bet slip is empty..</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
