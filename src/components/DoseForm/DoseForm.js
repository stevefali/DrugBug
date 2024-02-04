import "./DoseForm.scss";
import Form from "react-bootstrap/Form";
import DrugBugButton from "../DrugBugButton/DrugBugButton";

const DoseForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form className="dose-form">
      <div className="frequency-container">
        <Form.Group className="mb-3">
          <Form.Label>Frequency</Form.Label>
          <Form.Control type="text" placeholder="Frequency" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="One-time" />
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Date + Time</Form.Label>
        <Form.Control type="type" placeholder="Date + Time" />
      </Form.Group>
      <div className="amount-container">
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="type" placeholder="Amount" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Units</Form.Label>
          <Form.Control
            type="type"
            placeholder="mg"
            className="dose-form__field--units"
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Dose Reminder" />
      </Form.Group>
      <DrugBugButton text={"Submit"} handleClick={handleSubmit} />
    </Form>
  );
};

export default DoseForm;
