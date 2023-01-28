import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
    console.log(user);
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setUser({});
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?.id ? (
              <>
                <span className="nav-link "> Welcome {user.name}</span>{" "}
                <Link to="/dashboard" className="nav-link">
                  Dashborad
                </Link>
                <Link onClick={handleLogOut} to="#" className="nav-link">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
