import { Container } from "react-bootstrap";
import "./DoseEditPage.scss";
import axios from "axios";
import {
  getCurrentUserEndpoint,
  getUserMedicationsEndpoint,
} from "../../utils/networkUtils";
import { useState, useEffect } from "react";
import DoseForm from "../../components/DoseForm/DoseForm";

const DoseEditPage = ({ isAdd, medicationId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [failedAuth, setFailedAuth] = useState(false);
  const [userMedication, setUserMedication] = useState("");

  let token = null;

  const fetchAuthorizedUser = async (token) => {
    try {
      const userResponse = await axios.get(getCurrentUserEndpoint(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(userResponse.data);

      if (!isAdd) {
        const medResponse = await axios.get(
          getUserMedicationsEndpoint(userResponse.data.id),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // let selectedMedication = {};
        // for (const medication of medResponse.data.medications) {
        //   if (medication.id == medId) {
        //     selectedMedication = medication;
        //   }
        // }

        // setUserMedication(selectedMedication);
      }
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

  if (isAdd) {
    return (
      <Container>
        <DoseForm
          medication_id={medicationId}
          cron={""}
          oneTimeTime={""}
          amount={0}
          doseReminder={0}
          amountUnit={""}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <DoseForm />
      </Container>
    );
  }
};

export default DoseEditPage;
