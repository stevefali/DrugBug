import Form from "react-bootstrap/Form";

import "./MedicineForm.scss";
import DrugBugButton from "../DrugBugButton/DrugBugButton";

function MedicineForm(doseForms, setDoseForms) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form className="medication-form">
      <Form.Group className="mb-3">
        <Form.Label>Medicine Name</Form.Label>
        <Form.Control type="text" placeholder="Enter a medicine" />
      </Form.Group>

      <div className="amount-container">
        <Form.Group className="mb-3">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control type="type" placeholder="Amount" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Units</Form.Label>
          <Form.Control
            type="type"
            placeholder="mg"
            className="medication-form__field--units"
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Refilled On</Form.Label>
        <Form.Control type="type" placeholder="Date" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Reminder Date</Form.Label>
        <Form.Control type="type" placeholder="Date" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Refill Reminder" />
      </Form.Group>

      {/* {doseForms.map((doseForm) => {
        return doseForm;
      })} */}

      <DrugBugButton text={"Submit"} handleClick={handleSubmit} />
    </Form>
  );
}

export default MedicineForm;
