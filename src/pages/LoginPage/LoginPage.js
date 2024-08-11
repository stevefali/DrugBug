import "./LoginPage.scss";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import { postLoginEndpoint } from "../../utils/networkUtils";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formRef.current;
    // Verify input
    const fields = [email, password];
    for (const field of fields) {
      if (!field.value) {
        alert("Please fill all fields");
      }
    }

    try {
      const response = await axios.post(postLoginEndpoint(), {
        email: email.value,
        password: password.value,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(`Error Loggin In`);
      console.log(error);
    }
  };

  return (
    <main className="drugbug__page">
      <Container>
        <h1>Welcome to Drugbug!</h1>
        <h3 className="welcome-description">
          With DrugBug you can track all of your medications and doses in one
          place and set reminders on your computer or mobile device.
        </h3>
        <h4>Please login to get started.</h4>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your information with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <DrugBugButton text={"Log In"} type="submit" />
          {error && <div className="signup__message">{error}</div>}
        </Form>
        <p className="no-account">
          Don't have an account? <Link to="/signup">Sign up</Link>{" "}
        </p>
      </Container>
    </main>
  );
};

export default LoginPage;
