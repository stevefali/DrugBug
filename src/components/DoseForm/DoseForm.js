import "./DoseForm.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DoseForm = () => {
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
            className="medication-form__field--units"
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Dose Reminder" />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="medication-form__submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default DoseForm;
