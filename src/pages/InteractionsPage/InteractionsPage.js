import { useEffect, useState } from "react";
import "./InteractionsPage.scss";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "react-bootstrap";
import { getInteractionsEndpoint } from "../../utils/networkUtils";
import axios from "axios";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";

const InteractionsPage = ({ failedAuth, user }) => {
  const navigate = useNavigate();

  const [interactions, setInteractions] = useState([]);
  const [disclaimer, setDisclaimer] = useState("");

  const getInteractions = async (interactor) => {
    const token = localStorage.getItem("token");

    try {
      const interactionsResponse = await axios.get(
        getInteractionsEndpoint(interactor),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInteractions(interactionsResponse.data.interactionsResponse);
      setDisclaimer(interactionsResponse.data.disclaimer);
      console.log(interactionsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (failedAuth) {
      navigate("/");
    }
  }, [failedAuth]);

  if (user) {
    return (
      <main className="drugbug__page">
        <Container>
          <h1>Interactions</h1>
          <p>{user.first_name}</p>
          <DrugBugButton
            text={"Test"}
            handleClick={() => getInteractions("grapefruit")}
          />
          <Stack></Stack>
        </Container>
      </main>
    );
  } else {
    return (
      <main className="drugbug__page">
        <Container>
          <h1>Interactions</h1>
          <p>Loading</p>
        </Container>
      </main>
    );
  }
};

export default InteractionsPage;
