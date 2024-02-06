import "./DoseForm.scss";
import Form from "react-bootstrap/Form";
import DrugBugButton from "../DrugBugButton/DrugBugButton";
import { useState } from "react";

const DoseForm = ({
  medication_id,
  cron,
  oneTimeTime,
  amount,
  doseReminder,
  amountUnit,
}) => {
  const [isDoseReminder, setIsDoseReminder] = useState(doseReminder);
  const [isOneTime, setIsOneTime] = useState(false);

  const handledoseReminder = () => {
    setIsDoseReminder(!isDoseReminder);
  };

  const handleIsOneTime = () => {
    setIsOneTime(!isOneTime);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main>
      <h1>Add New Dose</h1>
      <div className="dose-form">
        <div className="frequency-container">
          <Form.Group className="mb-3">
            <Form.Label>Repeating</Form.Label>
            <Form.Control
              className="dose-form__field"
              name="frequency"
              type="text"
              placeholder="Frequency"
              disabled={isOneTime}
            />
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3 one-time__input">
            <Form.Label className="one-time">
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
              <Form.Check
                className="dose-form__check"
                // type="switch"
                label="One-time"
                onChange={handleIsOneTime}
              />
              {/* </Form.Group> */}
            </Form.Label>
            <Form.Control
              className="dose-form__field"
              type="datetime-local"
              disabled={!isOneTime}
            />
          </Form.Group>
        </div>
        <div className="amount-container">
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              className="dose-form__field"
              type="number"
              placeholder="Amount"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Units</Form.Label>
            <Form.Control
              type="text"
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
            checked={isDoseReminder}
          />
        </Form.Group>
        {/* <div className="plus-minus">
        <p className="plus-minus__button plus-minus__button--plus">+</p>
        <p className="plus-minus__button plus-minus__button--minus">-</p>
      </div> */}
        <DrugBugButton text={"Submit"} handleClick={handleSubmit} />
      </div>
    </main>
  );
};

export default DoseForm;
