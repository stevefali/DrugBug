import { Container } from "react-bootstrap";
import "./DoseEditPage.scss";
import axios from "axios";
import { getCurrentUserEndpoint } from "../../utils/networkUtils";
import { useState, useEffect } from "react";
import DoseForm from "../../components/DoseForm/DoseForm";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const DoseEditPage = ({ isAdd }) => {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  const navigate = useNavigate();

  let token = null;

  const fetchAuthorizedUser = async (token) => {
    try {
      const userResponse = await axios.get(getCurrentUserEndpoint(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(userResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    token = sessionStorage.getItem("token");
    if (!token) {
      setFailedAuth(true);
    }

    fetchAuthorizedUser(token);
  }, []);

  if (failedAuth) {
    navigate("/login");
  }

  return (
    <main className="drugbug__page">
      <Container>
        <DoseForm />
      </Container>
    </main>
  );
};

export default DoseEditPage;
