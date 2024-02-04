import Container from "react-bootstrap/Container";
import MedicineForm from "../../components/MedicineForm/MedicineForm";
import DoseForm from "../../components/DoseForm/DoseForm";
import "./AddEditPage.scss";

const AddEditPage = () => {
  return (
    <Container>
      <h1>Add New Medication</h1>
      <MedicineForm />
      <DoseForm />
    </Container>
  );
};

export default AddEditPage;
