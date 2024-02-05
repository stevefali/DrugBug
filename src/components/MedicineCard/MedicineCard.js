import "./MedicineCard.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import cronstrue from "cronstrue";
import parser from "cron-parser";
import datejs from "datejs";

const MedicineCard = ({ medication }) => {
  const navigate = useNavigate();

  const handleButton = (event) => {
    event.preventDefault();
    navigate(`/medication/${medication.id}`);
  };
  //

  const date = new Date(medication.refill_reminder_date).toDateString();
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
          {/* <ListGroup.Item>{desc}</ListGroup.Item> */}
          {/* <ListGroup.Item className="bg-light medicine-card__item">
            <Stack
              direction="horizontal"
              className="d-flex justify-content-between"
            >
              <p className="dose-label">Doses</p>
            
            </Stack>
          </ListGroup.Item> */}

          {/* <ListGroup.Item className="next-label"></ListGroup.Item> */}
          {medication.doses.map((dose) => {
            const interval = parser.parseExpression(dose.cron);
            const cronDescription = cronstrue.toString(dose.cron, {
              verbose: true,
            });
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
                  <p className="dose-description">{cronDescription}</p>
                </div>
                <Stack
                  direction="horizontal"
                  className="d-flex justify-content-between"
                >
                  <p className="dose-label">Next Dose</p>
                  <p className="dose-label">Notifications</p>
                  {/* <p className="dose-label"></p> */}
                  {/* <p>Upcoming Doses</p> */}
                </Stack>
                <Stack
                  direction="horizontal"
                  className="d-flex justify-content-between"
                >
                  <div className="dose-date">
                    <div>{interval.next().toDate().toDateString()}</div>
                    <div>{interval.next().toDate().toLocaleTimeString()}</div>
                  </div>
                  <div className={`reminder reminder--${dose.dose_reminder}`}>
                    {dose.dose_reminder ? "On" : "Off"}
                  </div>
                </Stack>
              </ListGroup.Item>
            );
          })}
          {/* <ListGroup.Item>{interv.next().toString()}</ListGroup.Item>
        <ListGroup.Item>{interv.next().toString()}</ListGroup.Item>*/}
          <ListGroup.Item className="bg-light">
            <Stack
              direction="horizontal"
              className="d-flex justify-content-between"
            >
              <div className="dose-label">Amount Remaining</div>
              <div className="dose-label">Refill By</div>
              <div className="dose-label">Notification</div>
              {/* <div className="button-space"></div> */}
            </Stack>
          </ListGroup.Item>

          <ListGroup.Item className="bg-light">
            <Stack
              direction="horizontal"
              className="d-flex justify-content-between"
            >
              <div className="amount-remaining">
                <div>{`${medication.amount_remaining} ${medication.amount_unit}`}</div>
                {/* <div>{medication.amount_unit}</div> */}
              </div>
              <div>{date}</div>
              <div
                className={`reminder reminder--${medication.refill_reminder}`}
              >
                {medication.refill_reminder ? "On" : "Off"}
              </div>
              {/* <Button>Change</Button> */}
            </Stack>
          </ListGroup.Item>

          {/* <ListGroup.Item>{interv.next().toString()}</ListGroup.Item> */}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default MedicineCard;
