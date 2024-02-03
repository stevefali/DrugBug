import Container from "react-bootstrap/Container";
import "./NotFoundPage.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <Container className="not-found">
        <h1>Page Not Found</h1>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Home Page
        </Button>
      </Container>
    </main>
  );
};

export default NotFoundPage;
