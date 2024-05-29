import "./MedicineCard.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import cronstrue from "cronstrue";
import parser from "cron-parser";

const MedicineCard = ({ medication }) => {
  const navigate = useNavigate();

  const handleButton = (event) => {
    event.preventDefault();
    navigate(`/medication/${medication.id}`);
  };

  let interval;
  let cronDescription;
  const refillBy = new Date(medication.refill_reminder_date).toLocaleString(
    "en-us",
    { dateStyle: "medium" }
  );

  return (
    <Card className="medicine-card border-success bg-light mb-3">
      <Card.Header className="medicine-card__header">
        <Card.Title className="medicine-card__title">
          {medication.medicine_name}
        </Card.Title>
        <Button className="btn-success" onClick={handleButton}>
          Change
        </Button>
      </Card.Header>
      <Card.Body className="medicine-card__body">
        <ListGroup variant="flush" className="medicine-card__list-group">
          {medication.doses.map((dose) => {
            if (dose.cron) {
              interval = parser.parseExpression(dose.cron);
              cronDescription = cronstrue.toString(dose.cron, {
                verbose: true,
              });
            }

            return (
              <ListGroup.Item
                className="bg-light medicine-card__item"
                key={dose.id}
              >
                <div
                  direction="horizontal"
                  className="d-flex justify-content-between medicine-card__dose"
                >
                  <p className="dose-label">{`${dose.amount} ${medication.amount_unit}`}</p>
                  {dose.cron && (
                    <p className="dose-description">{cronDescription}</p>
                  )}
                  {dose.onetime_time && (
                    <p className="dose-description">
                      {formatTime(dose.onetime_time)}
                    </p>
                  )}
                </div>
                <Stack
                  direction="horizontal"
                  className="d-flex justify-content-between"
                >
                  <p className="dose-label">Next Dose</p>
                  <p className="dose-label">Notifications</p>
                </Stack>
                <Stack
                  direction="horizontal"
                  className="d-flex justify-content-between"
                >
                  <div className="dose-date">
                    {dose.cron && (
                      <>
                        <div>{interval.next().toDate().toDateString()}</div>
                        <div>
                          {interval
                            .next()
                            .toDate()
                            .toLocaleString("en-us", { timeStyle: "short" })}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={`reminder reminder--${dose.dose_reminder}`}>
                    {dose.dose_reminder ? "On" : "Off"}
                  </div>
                </Stack>
              </ListGroup.Item>
            );
          })}

          <ListGroup.Item className="bg-light">
            <Stack
              direction="horizontal"
              className="d-flex justify-content-between"
            >
              <div className="dose-label">Total Amount</div>
              <div className="dose-label">Refill By</div>
              <div className="dose-label">Notification</div>
            </Stack>
          </ListGroup.Item>

          <ListGroup.Item className="bg-light">
            <Stack
              direction="horizontal"
              className="d-flex justify-content-between"
            >
              <div className="amount-remaining">
                <div>{`${medication.amount_remaining} ${medication.amount_unit}`}</div>
              </div>
              <div className="refill-date">{refillBy}</div>
              <div
                className={`reminder reminder--${medication.refill_reminder}`}
              >
                {medication.refill_reminder ? "On" : "Off"}
              </div>
            </Stack>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default MedicineCard;

function formatTime(mills) {
  return new Date(mills).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
