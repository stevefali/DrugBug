import Form from "react-bootstrap/Form";
import "./SignupPage.scss";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";
import { postRegisterEndpoint } from "../../utils/networkUtils";
import axios from "axios";
import { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const formRef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { first_name, last_name, email, password } = formRef.current;
    // Verify input
    const fields = [first_name, last_name, email, password];
    for (const field of fields) {
      if (!field.value) {
        alert("Please fill all fields");
      }
    }

    try {
      const response = await axios.post(postRegisterEndpoint(), {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
      });
      if (response) {
        setSuccess(true);
        formRef.current.reset();
        setError("");
      }
    } catch (error) {
      setError(`Error signing up`);
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" placeholder="Last Name" />
        </Form.Group>
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

        <DrugBugButton text={"Sign Up"} type="submit" />
        {success && <div className="signup__message">Signed up!</div>}
        {error && <div className="signup__message">{error}</div>}
      </Form>
      <p className="have-account">
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </Container>
  );
};

export default SignupPage;
