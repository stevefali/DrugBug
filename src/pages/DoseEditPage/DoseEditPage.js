import { Container } from "react-bootstrap";
import "./DoseEditPage.scss";
import axios from "axios";
import {
  getCurrentUserEndpoint,
  getUserMedicationsEndpoint,
} from "../../utils/networkUtils";
import { useState, useEffect } from "react";
import DoseForm from "../../components/DoseForm/DoseForm";
import { useLocation, useParams } from "react-router";

const DoseEditPage = ({ isAdd }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [failedAuth, setFailedAuth] = useState(false);
  const [userMedication, setUserMedication] = useState("");

  const { doseId } = useParams();

  let token = null;

  const fetchAuthorizedUser = async (token) => {
    try {
      const userResponse = await axios.get(getCurrentUserEndpoint(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(userResponse.data);

      //   if (!isAdd) {
      //     const medResponse = await axios.get(
      //       getUserMedicationsEndpoint(userResponse.data.id),
      //       {
      //         headers: {
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );

      // let selectedMedication = {};
      // for (const medication of medResponse.data.medications) {
      //   if (medication.id == medId) {
      //     selectedMedication = medication;
      //   }
      // }

      // setUserMedication(selectedMedication);
      //   }
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

  return (
    <Container>
      <DoseForm />
    </Container>
  );
};

export default DoseEditPage;
