import "./DoseForm.scss";
import Form from "react-bootstrap/Form";
import DrugBugButton from "../DrugBugButton/DrugBugButton";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import parser from "cron-parser";
import { postAddMedicationEndpoint } from "../../utils/networkUtils";
import axios from "axios";

const DoseForm = ({ medication_id }) => {
  const [isDoseReminder, setIsDoseReminder] = useState(false);
  const [isOneTime, setIsOneTime] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const formRef = useRef();

  let cron = "* * * * *";

  const handledoseReminder = () => {
    setIsDoseReminder(!isDoseReminder);
  };

  const handleIsOneTime = () => {
    setIsOneTime(!isOneTime);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const interval = parser.parseExpression(cron);
    const fields = JSON.parse(JSON.stringify(interval.fields));

    const current = formRef.current;

    if (!current.amount.value) {
      alert("Dose amount required!");
      return;
    }
    if (!isOneTime) {
      if (!current.time.value) {
        alert("Time of day required!");
        return;
      }
      const minutes = Number(current.time.value.split(":")[1]);
      const hours = Number(current.time.value.split(":")[0]);
      if (current.day.value !== "*") {
        const days = Number(current.day.value);
        fields.dayOfMonth = [days];
      }
      if (current.month.value !== "*") {
        const months = Number(current.month.value);
        fields.month = [months];
      }
      if (current.weekday.value !== "*") {
        const weekdays = Number(current.weekday.value);
        fields.dayOfWeek = [weekdays];
      }

      fields.minute = [minutes];
      fields.hour = [hours];

      const selectedInterval = parser.fieldsToExpression(fields);
      const cronString = selectedInterval.stringify();

      cron = cronString;
    }

    addDose();
  };

  const addDose = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = {
        medications: [],
        doses: [
          {
            medication_id: medication_id,
            cron: isOneTime ? null : cron,
            onetime_time: isOneTime
              ? new Date(formRef.current.onetime.value).getTime()
              : null,
            amount: formRef.current.amount.value,
            dose_reminder: isDoseReminder ? 1 : 0,
          },
        ],
      };
      const doseRes = await axios.post(postAddMedicationEndpoint(), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Error Submitting new Dose");
    }
  };

  return (
    <main>
      <h1>Add New Dose</h1>
      <Form className="dose-form" ref={formRef}>
        <div className="frequency-container">
          <Form.Group className="mb-3 cron">
            <Form.Label>Repeating</Form.Label>

            <Form.Control
              className="dose-form__field"
              type="time"
              name="time"
              disabled={isOneTime}
            ></Form.Control>
            <Form.Select
              className="dose-form__field"
              name="day"
              disabled={isOneTime}
            >
              <option value={"*"}>Every Day of the Month</option>
              <option value="1">1st of the Month</option>
              <option value="2">2nd of the Month</option>
              <option value="3">3rd of the Month</option>
              <option value="4">4th of the Month</option>
              <option value="5">5th of the Month</option>
              <option value="6">6th of the Month</option>
              <option value="7">7th of the Month</option>
              <option value="8">8th of the Month</option>
              <option value="9">9th of the Month</option>
              <option value="10">10th of the Month</option>
              <option value="11">11th of the Month</option>
              <option value="12">12th of the Month</option>
              <option value="13">13th of the Month</option>
              <option value="14">14th of the Month</option>
              <option value="15">15th of the Month</option>
              <option value="16">16th of the Month</option>
              <option value="17">17th of the Month</option>
              <option value="18">18th of the Month</option>
              <option value="19">19th of the Month</option>
              <option value="20">20th of the Month</option>
              <option value="21">21st of the Month</option>
              <option value="22">22nd of the Month</option>
              <option value="23">23rd of the Month</option>
              <option value="24">24th of the Month</option>
              <option value="25">25th of the Month</option>
              <option value="26">26th of the Month</option>
              <option value="27">27th of the Month</option>
              <option value="28">28th of the Month</option>
              <option value="29">29th of the Month</option>
              <option value="30">30th of the Month</option>
              <option value="31">31st of the Month</option>
            </Form.Select>
            <Form.Select
              className="dose-form__field"
              name="month"
              disabled={isOneTime}
            >
              <option value={"*"}>Every Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Form.Select>
            <Form.Select
              className="dose-form__field"
              name="weekday"
              disabled={isOneTime}
            >
              <option value={"*"}>Any Day of the Week</option>
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 one-time__input">
            <Form.Label className="one-time">
              <Form.Check
                className="dose-form__check"
                label="One-time"
                onChange={handleIsOneTime}
              />
            </Form.Label>
            <Form.Control
              className="dose-form__field"
              type="datetime-local"
              disabled={!isOneTime}
              name="onetime"
            />
          </Form.Group>
        </div>
        <div className="amount-container">
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              className="dose-form__field"
              type="number"
              name="amount"
              placeholder="Amount"
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            className="dose-form__field"
            type="checkbox"
            label="Dose Reminder"
            name="dosereminder"
            onChange={handledoseReminder}
          />
        </Form.Group>

        <DrugBugButton text={"Submit"} handleClick={handleSubmit} />
      </Form>
      {error && <p>{error}</p>}
    </main>
  );
};

export default DoseForm;
