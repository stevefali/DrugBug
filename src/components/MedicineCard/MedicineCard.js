import "./MedicineCard.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const MedicineCard = ({ medication }) => {
  const navigate = useNavigate();

  const handleButton = (event) => {
    event.preventDefault();
    navigate("/medication");
  };

  return (
    <Card className="card--medicine border-success">
      <Card.Body className="card__title">
        <Card.Title>{medication.medicine_name}</Card.Title>
        <Button className="btn-success" onClick={handleButton}>
          Change
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MedicineCard;
