import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/user/usersApiSlice";
import { logout } from "../../store/slices/authSlice";

const Header = ({ league, setLeague }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to update league state and navigate
  const handleLeagueChange = (selectedLeague) => {
    setLeague(selectedLeague); // Update league state
    navigate("/odds"); // Navigate to odds page
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Fantasy Wager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* League Dropdown without LinkContainer */}
              <NavDropdown title="League" id="League">
                <NavDropdown.Item onClick={() => handleLeagueChange("nfl")}>
                  NFL
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLeagueChange("nba")}>
                  NBA
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLeagueChange("nhl")}>
                  NHL
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/bets">Bets</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasScrolling"
                    aria-controls="offcanvasScrolling"
                  >
                    Bet Slip
                  </button>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                  <Nav.Link href="/register">
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
