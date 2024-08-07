import { Container } from "react-bootstrap";
import "./DoseEditPage.scss";
import axios from "axios";
import {
  getCurrentUserEndpoint,
  getUserMedicationsEndpoint,
} from "../../utils/networkUtils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DoseForm from "../../components/DoseForm/DoseForm";
import { useParams } from "react-router";

const DoseAddPage = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  const { medicationId } = useParams();

  let token = null;

  const fetchAuthorizedUser = async (token) => {
    try {
      const userResponse = await axios.get(getCurrentUserEndpoint(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(userResponse.data);

      const medResponse = await axios.get(
        getUserMedicationsEndpoint(userResponse.data.id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    if (!token) {
      setFailedAuth(true);
    }

    fetchAuthorizedUser(token);
  }, []);

  if (failedAuth) {
    return (
      <Container>
        <h1>Welcome to DrugBug</h1>
        <p>Please Login to get started.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <DoseForm medication_id={medicationId} />
    </Container>
  );
};

export default DoseAddPage;
