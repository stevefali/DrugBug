import "./LoginPage.scss";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useState, useRef, useEffect } from "react";
import { postLoginEndpoint } from "../../utils/networkUtils";
import { useNavigate } from "react-router-dom";
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

      sessionStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(`Error Loggin In`);
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!failedAuth) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
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
    </Container>
  );
};

export default LoginPage;
