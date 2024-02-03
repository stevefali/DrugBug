import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NotificationAPIContainer from "../../memos/NotificationApiContainer";
import "./Header.scss";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import logo from "../../logo.svg";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <Navbar
        expand="lg"
        className="navbar navbar-expand-lg bg-primary"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top "
            />{" "}
            DrugBug
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="underline">
              <Nav.Item>
                <LinkContainer to={"/"}>
                  <Nav.Link href="/">Home</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to={"/medication/"}>
                  <Nav.Link>Medication</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          {/* <NotificationAPIContainer userId="1234" /> */}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
