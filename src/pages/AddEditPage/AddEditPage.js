import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import MedicineForm from "../../components/MedicineForm/MedicineForm";

import "./AddEditPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getCurrentUserEndpoint,
  postAddMedicationEndpoint,
  putModifyMedicationEndpoint,
  deleteMedicationEndpoint,
} from "../../utils/networkUtils";

import { getUserMedicationsEndpoint } from "../../utils/networkUtils";
import { useNavigate, useParams } from "react-router-dom";

const AddEditPage = ({ isAdd }) => {
  const [user, setUser] = useState(null);
  const [doseForms, setDoseForms] = useState([1]);
  const [userMedication, setUserMedication] = useState("");
  const [failedAuth, setFailedAuth] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let token = null;

  const { medId } = useParams();

  const navigate = useNavigate();

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

        let selectedMedication = {};
        for (const medication of medResponse.data.medications) {
          if (medication.id == medId) {
            selectedMedication = medication;
          }
        }

        setUserMedication(selectedMedication);
      }
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

  const addMedication = async (
    medicineName,
    amountRemaining,
    userId,
    refillReminder,
    refillReminderDate,
    refilledOn,
    amountUnit
  ) => {
    try {
      token = localStorage.getItem("token");
      const data = {
        medications: [
          {
            medicine_name: medicineName,
            amount_remaining: amountRemaining,
            user_id: userId,
            refill_reminder: refillReminder,
            refill_reminder_date: refillReminderDate,
            refilled_on: refilledOn,
            amount_unit: amountUnit,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        ],
        doses: [],
      };
      const response = await axios.post(postAddMedicationEndpoint(), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Added new Medication");
      navigate("/");
    } catch (error) {
      setError("Error adding medication.");
      console.log(error);
    }
  };

  const editMedication = async (
    medicineName,
    amountRemaining,
    userId,
    refillReminder,
    refillReminderDate,
    refilledOn,
    amountUnit
  ) => {
    try {
      token = localStorage.getItem("token");
      const editMedResponse = await axios.put(
        putModifyMedicationEndpoint(medId),
        {
          medicine_name: medicineName,
          amount_remaining: amountRemaining,
          user_id: userId,
          refill_reminder: refillReminder,
          refill_reminder_date: refillReminderDate,
          refilled_on: refilledOn,
          amount_unit: amountUnit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      setError("Error updating medication.");
      console.log(error);
    }
  };

  const deleteMedication = async () => {
    token = localStorage.getItem("token");
    try {
      const response = await axios.delete(deleteMedicationEndpoint(medId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      setError("Error deleting medication.");
      console.log(error);
    }
  };

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
          refill_reminder={0}
          refill_reminder_date={""}
          refilled_on={""}
          amount_unit={""}
          submitResult={addMedication}
          isAdd={isAdd}
        />
      </Container>
    );
  } else {
    if (!userMedication) {
      return <p>Loading</p>;
    }
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
          refill_reminder_date={new Date(refill_reminder_date)
            .toISOString()
            .substring(0, 10)}
          refilled_on={new Date(refilled_on).toISOString().substring(0, 10)}
          amount_unit={amount_unit}
          submitResult={editMedication}
          doDelete={deleteMedication}
          isAdd={isAdd}
          medicationId={medId}
        />
        {error && <p>Error updating medication</p>}
      </Container>
    );
  }
};

export default AddEditPage;
