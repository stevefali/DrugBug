import { useEffect, useRef, useState } from "react";
import "./InteractionsPage.scss";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "react-bootstrap";
import { getInteractionsEndpoint } from "../../utils/networkUtils";
import axios from "axios";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";
import Interaction from "../../components/Interaction/Interaction";
import Form from "react-bootstrap/Form";

const InteractionsPage = ({ failedAuth, user }) => {
  const navigate = useNavigate();

  const [interactions, setInteractions] = useState([]);
  const [disclaimer, setDisclaimer] = useState("");
  const [disableSearchButton, setDisableSearchButton] = useState(true);

  const formRef = useRef();

  const handleSearchbarChange = () => {
    if (formRef.current.search_bar.value.trim().length < 1) {
      setDisableSearchButton(true);
    } else {
      setDisableSearchButton(false);
    }
  };

  const getInteractions = async (event) => {
    event.preventDefault();
    const interactor = formRef.current.search_bar.value;
    if (interactor.trim().length < 1) {
      alert("Please enter an interactor.");
    } else {
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
          <p className="interaction-explain">
            Enter a food, drink, or drug to check for interactions with your
            medications.
          </p>
          <Form
            ref={formRef}
            onSubmit={getInteractions}
            className="interaction-form"
          >
            <DrugBugButton text={"Search"} disabled={disableSearchButton} />
            <Form.Control
              name="search_bar"
              onChange={handleSearchbarChange}
              placeholder="Enter a food, drink or drug"
              className="interaction-form__search-bar"
            ></Form.Control>
          </Form>
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
