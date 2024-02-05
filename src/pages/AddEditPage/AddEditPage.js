import Container from "react-bootstrap/Container";
import MedicineForm from "../../components/MedicineForm/MedicineForm";
import DoseForm from "../../components/DoseForm/DoseForm";
import "./AddEditPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getCurrentUserEndpoint,
  postAddMedicationEndpoint,
  putModifyMedicationEndpoint,
} from "../../utils/networkUtils";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";
import Form from "react-bootstrap/Form";
import { getUserMedicationsEndpoint } from "../../utils/networkUtils";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
        // let selectedMedication = medResponse.data.medications.filter(
        //   (medication) => {
        //     console.log("internal", medication.id);
        //     return medId === medication.id;
        //   }
        // );
        let selectedMedication = {};
        for (const medication of medResponse.data.medications) {
          if (medication.id == medId) {
            console.log("found");
            selectedMedication = medication;
          }
        }

        setUserMedication(selectedMedication);
        console.log("selected ", selectedMedication);
        console.log("userMedications", userMedication);
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
      // console.log(amount_unit);
      token = sessionStorage.getItem("token");
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

  const editMedication = async ({
    medicine_name,
    amount_remaining,
    user_id,
    refill_reminder,
    refill_reminder_date,
    refilled_on,
    amount_unit,
  }) => {
    try {
      console.log(medicine_name);
      const editMedResponse = await axios.put(
        putModifyMedicationEndpoint(medId),
        {
          medicine_name: medicine_name,
          amount_remaining: amount_remaining,
          // user_id: user_id,
          refill_reminder: refill_reminder,
          refill_reminder_date: refill_reminder_date,
          refilled_on: refilled_on,
          amount_unit: amount_unit,
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
          refill_reminder_date={refill_reminder_date}
          refilled_on={new Date(refilled_on).toISOString().substring(0, 10)}
          amount_unit={amount_unit}
          submitResult={editMedication}
        />
        {error && <p>Error updating medication</p>}
      </Container>
    );
  }
};

export default AddEditPage;
