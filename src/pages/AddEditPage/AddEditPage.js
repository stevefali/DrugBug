import Container from "react-bootstrap/Container";
import MedicineForm from "../../components/MedicineForm/MedicineForm";
import DoseForm from "../../components/DoseForm/DoseForm";
import "./AddEditPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUserEndpoint } from "../../utils/networkUtils";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";
import Form from "react-bootstrap/Form";

const AddEditPage = () => {
  const [user, setUser] = useState(null);
  const [doseForms, setDoseForms] = useState([<DoseForm />]);
  // const [userMedications, setUserMedications] = useState([]);
  const [failedAuth, setFailedAuth] = useState(false);
  let token = null;

  const fetchAuthorizedUser = async (token) => {
    try {
      const response = await axios.get(getCurrentUserEndpoint(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);

      //   const medResponse = await axios.get(
      //     getUserMedicationsEndpoint(response.data.id),
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );

      //   setUserMedications(medResponse.data.medications);
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

  const handleAddMedication = () => {};

  return (
    <Container>
      <h1>Add New Medication</h1>
      <MedicineForm doseForms={doseForms} setDoseForms={setDoseForms} />
      {/* <DoseForm /> */}
    </Container>
  );
};

export default AddEditPage;
