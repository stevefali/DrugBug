import "./DoseForm.scss";
import Form from "react-bootstrap/Form";
import DrugBugButton from "../DrugBugButton/DrugBugButton";

const DoseForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="dose-form">
      <div className="frequency-container">
        <Form.Group className="mb-3">
          <Form.Label>Frequency</Form.Label>
          <Form.Control
            className="dose-form__field"
            type="text"
            placeholder="Frequency"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            className="dose-form__check"
            // type="switch"
            label="One-time"
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Date + Time</Form.Label>
        <Form.Control
          className="dose-form__field"
          type="type"
          placeholder="Date + Time"
        />
      </Form.Group>
      <div className="amount-container">
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            className="dose-form__field"
            type="type"
            placeholder="Amount"
          />
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
        <Form.Check
          className="dose-form__field"
          type="checkbox"
          label="Dose Reminder"
        />
      </Form.Group>
      {/* <div className="plus-minus">
        <p className="plus-minus__button plus-minus__button--plus">+</p>
        <p className="plus-minus__button plus-minus__button--minus">-</p>
      </div> */}
      <DrugBugButton text={"Submit"} handleClick={handleSubmit} />
    </div>
  );
};

export default DoseForm;
