import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.scss";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import NotificationAPI from "notificationapi-js-client-sdk";
import { ReactComponent as SettingsIcon } from "../../settings.svg";

function Header({ user, handleLogout, sendWebPushTokens }) {
  const navigate = useNavigate();

  const onSettingsClick = (event) => {
    event.preventDefault();
    if (user) {
      const notificationApi = new NotificationAPI({
        clientId: process.env.REACT_APP_NOTIFICATIONAPI_CLIENT_ID,
        userId: user.id.toString(),
      });

      navigator.serviceWorker.ready.then((worker) => {
        worker.pushManager
          .permissionState({ userVisibleOnly: true })
          .then((perm) => {
            if (perm === "prompt") {
              notificationApi.askForWebPushPermission();
            }
            if (perm === "granted") {
              worker.pushManager.getSubscription().then((sub) => {
                sendWebPushTokens(sub.toJSON());
              });
            }
          });
      });

      notificationApi.showUserPreferences();
    }
  };

  const handleAccountClick = (event) => {
    event.preventDefault();
    navigate("/account");
  };

  return (
    <header>
      <Navbar
        expand="lg"
        className="navbar navbar-expand-lg bg-success"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/">DrugBug</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Item>
                <LinkContainer to={"/"}>
                  <Nav.Link
                    className={
                      window.location.pathname === "/"
                        ? "drugbug-nav-link drugbug-nav-link--active"
                        : "drugbug-nav-link "
                    }
                  >
                    Home
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to={"/medication"}>
                  <Nav.Link
                    className={
                      window.location.pathname === "/"
                        ? "drugbug-nav-link"
                        : "drugbug-nav-link drugbug-nav-link--active"
                    }
                  >
                    Add Medication
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          {user ? (
            <div className="login-holder">
              {" "}
              <p className="login-holder__name" onClick={handleAccountClick}>
                {user.first_name}
              </p>
              <Button
                variant="link"
                className="login-holder__button"
                onClick={handleLogout}
                href="/login"
              >
                Log Out
              </Button>
              <SettingsIcon
                fill="white"
                className="settings-button"
                onClick={onSettingsClick}
              />
            </div>
          ) : (
            <div className="login-holder">
              <Button
                variant="link"
                className="login-holder__button"
                href="/login"
              >
                Log In
              </Button>
            </div>
          )}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
