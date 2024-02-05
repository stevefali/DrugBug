import Container from "react-bootstrap/Container";
import MedicineForm from "../../components/MedicineForm/MedicineForm";
import DoseForm from "../../components/DoseForm/DoseForm";
import "./AddEditPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUserEndpoint } from "../../utils/networkUtils";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";
import Form from "react-bootstrap/Form";
import { getUserMedicationsEndpoint } from "../../utils/networkUtils";
import { useParams } from "react-router-dom";

const AddEditPage = ({ isAdd }) => {
  const [user, setUser] = useState(null);
  const [doseForms, setDoseForms] = useState([1]);
  const [userMedication, setUserMedication] = useState({});
  const [failedAuth, setFailedAuth] = useState(false);
  let token = null;

  const { medId } = useParams();

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
        const selectedMedication = medResponse.data.medications.filter(
          (medication) => {
            return medId === medication.id;
          }
        );
        setUserMedication(selectedMedication);
      }
      // console.log(response.data);
      console.log(user);
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

  const addMedication = async () => {};

  const editMedication = async () => {};

  if (user === null) {
    return <p>Loading</p>;
  }

  if (isAdd) {
    return (
      <Container>
        <h1>Add New Medication</h1>
        <MedicineForm
          medicine_name={""}
          amount_remaining={""}
          user_id={user.id}
          refill_reminder="false"
          refill_reminder_date={" "}
          refilled_on={new Date(Date.now()).toISOString().substring(0, 10)}
          amount_unit={""}
          submitResult={addMedication}
        />
      </Container>
    );
  } else {
    const {
      medicine_name,
      amount_remaining,
      user_id,
      refill_reminder,
      refill_reminder_date,
      refilled_on,
      amount_unit,
    } = userMedication;
    return (
      <Container>
        <h1>Edit Medication</h1>
        <MedicineForm
          medicine_name={medicine_name}
          amount_remaining={amount_remaining}
          user_id={user_id}
          refill_reminder={refill_reminder}
          refill_reminder_date={refill_reminder_date}
          refilled_on={refilled_on}
          amount_unit={amount_unit}
          submitResult={editMedication}
        />
      </Container>
    );
  }
};

export default AddEditPage;
