import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import auth from your firebase.js file
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const { logout } = useAuth;
  const navigateTo = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigateTo("/login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container fluid>
        <Container className="d-flex justify-content-around align-items-center">
          <Nav className="me-4">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <div className="ms-5">
              <Nav.Link to="/store" as={NavLink}>
                Store
              </Nav.Link>
            </div>
          </Nav>

          {/* <div className="d-none  d-md-flex d-lg-flex flex-grow-1">
            <InputGroup
              className="my-auto mx-auto"
              style={{ maxWidth: "500px" }}
            >
              <Form.Control
                placeholder="Search For Kicks"
                aria-label="Search For Kicks"
                aria-describedby="basic-addon2"
                style={{ fontSize: "14px" }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                className="fw-bold"
                style={{ fontSize: "13px" }}
              >
                Search
              </Button>
            </InputGroup>
          </div> */}
          <Nav className="me-5">
            <h2>KicksKraze</h2>
          </Nav>

          <Nav className="align-items-center ms-4">
            {/* <Button
              style={{
                width: "3rem",
                height: "3rem",
                marginLeft: "20px",
                marginRight: "20px",
              }}
              variant="white"
              className="rounded-circle"
            >
              <FaUser className="fs-4" />
            </Button> */}
            {userLoggedIn === false ? (
              <Nav.Link to="/login" as={NavLink} className="fs-5 pe-auto">
                Login
              </Nav.Link>
            ) : (
              <div>
                <Button
                  style={{
                    width: "3rem",
                    height: "3rem",
                    position: "relative",
                    marginRight: "30px",
                  }}
                  variant="white"
                  className="rounded-circle"
                  onClick={openCart}
                >
                  <FaCartShopping className="fs-4" />
                  {cartQuantity > 0 && (
                    <div
                      className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                      style={{
                        color: "white",
                        width: "1.5rem",
                        height: "1.5rem",
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        transform: "translate(25%, 5%)",
                      }}
                    >
                      {cartQuantity}
                    </div>
                  )}
                </Button>
                <Button onClick={handleLogout}>Log Out</Button>
              </div>
            )}
          </Nav>
        </Container>
      </Container>
    </NavbarBs>
  );
}
