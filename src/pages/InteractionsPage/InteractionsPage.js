import { useEffect, useState } from "react";
import "./InteractionsPage.scss";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "react-bootstrap";
import { getInteractionsEndpoint } from "../../utils/networkUtils";
import axios from "axios";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";
import Interaction from "../../components/Interaction/Interaction";

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
          <DrugBugButton
            text={"Test"}
            handleClick={() => getInteractions("grapefruit")}
          />
          <Stack className="interaction-result__stack">
            {interactions.map((interaction) => {
              return (
                <Interaction
                  interaction={interaction}
                  key={interaction.medicine}
                />
              );
            })}
          </Stack>
          <p className="interaction-result__disclaimer">{disclaimer}</p>
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
