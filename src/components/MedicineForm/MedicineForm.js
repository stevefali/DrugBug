import Form from "react-bootstrap/Form";

import "./MedicineForm.scss";
import DrugBugButton from "../DrugBugButton/DrugBugButton";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function MedicineForm({
  medicine_name,
  amount_remaining,
  user_id,
  refill_reminder,
  refill_reminder_date,
  refilled_on,
  amount_unit,
  submitResult,
  doDelete,
  isAdd,
  medicationId,
}) {
  const navigate = useNavigate();

  const formRef = useRef();

  const initialFieldValues = {
    medicine_name: medicine_name,
    amount_remaining: amount_remaining,
    refill_reminder: refill_reminder,
    refill_reminder_date: refill_reminder_date,
    refilled_on: refilled_on,
    amount_unit: amount_unit,
  };

  const [isRefillReminder, setIsRefillReminder] = useState(refill_reminder);
  const [fieldValues, setFieldValues] = useState(initialFieldValues);

  const handleRefillReminder = () => {
    setIsRefillReminder(!isRefillReminder);
  };
  const handleDelete = (event) => {
    event.preventDefault();
    doDelete();
  };

  const handleAddDose = (event) => {
    event.preventDefault();
    navigate(`/newdose/${medicationId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      medicine_name,
      amount_remaining,
      amount_unit,
      refilled_on,
      refill_reminder_date,
      refill_reminder,
    } = formRef.current;
    const neededFields = [
      medicine_name,
      amount_remaining,
      amount_unit,
      refilled_on,
    ];
    for (const field of neededFields) {
      if (!field.value) {
        alert("Please fill all required fields");
      }
    }

    submitResult(
      formRef.current.medicine_name.value,
      formRef.current.amount_remaining.value,
      user_id,
      isRefillReminder ? 1 : 0,
      new Date(formRef.current.refill_reminder_date.value).getTime(),
      new Date(formRef.current.refilled_on.value).getTime(),
      formRef.current.amount_unit.value
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldValues({ ...fieldValues, [name]: value });
    event.target.setCustomValidity("");
  };

  return (
    <Form className="medication-form" ref={formRef}>
      <Form.Group className="mb-3">
        <Form.Label>Medicine Name</Form.Label>
        <Form.Control
          className="medication-form__field"
          type="text"
          placeholder="Enter a medicine"
          name="medicine_name"
          value={fieldValues.medicine_name}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="amount-container">
        <Form.Group className="mb-3">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control
            className="medication-form__field"
            type="number"
            placeholder="Amount"
            name="amount_remaining"
            value={fieldValues.amount_remaining}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Units</Form.Label>
          <Form.Control
            type="text"
            placeholder="mg"
            className="medication-form__field--units"
            name="amount_unit"
            value={fieldValues.amount_unit}
            onChange={handleChange}
          />
        </Form.Group>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Refilled On</Form.Label>
        <Form.Control
          className="medication-form__field"
          type="date"
          placeholder="Date"
          name="refilled_on"
          value={fieldValues.refilled_on}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Reminder Date</Form.Label>
        <Form.Control
          className="medication-form__field"
          type="datetime-local"
          placeholder="Date"
          name="refill_reminder_date"
          value={fieldValues.refill_reminder_date}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          className="medication-form__field"
          type="checkbox"
          label="Refill Reminder"
          name="refill_reminder"
          value={fieldValues.refill_reminder}
          onChange={handleRefillReminder}
          checked={isRefillReminder}
        />
      </Form.Group>

      <div className="medication-form__submit">
        <DrugBugButton text={"Submit"} handleClick={handleSubmit} />
        <DrugBugButton
          text={"Cancel"}
          handleClick={() => navigate("/")}
          variant="outline-secondary"
        />
      </div>
      {isAdd || (
        <div className="medication-form__submit">
          <Button variant="secondary" onClick={handleDelete} className="delete">
            Delete
          </Button>
          <DrugBugButton
            text={"Add Dose"}
            className="add-dose"
            handleClick={handleAddDose}
          />
        </div>
      )}
    </Form>
  );
}

export default MedicineForm;
