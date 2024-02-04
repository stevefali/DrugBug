import Button from "react-bootstrap/Button";

import "./DrugBugButton.scss";

const DrugBugButton = ({ text, handleClick }) => {
  return (
    <Button
      onClick={handleClick}
      variant="success"
      type="submit"
      className="drugbug-button"
    >
      {text}
    </Button>
  );
};

export default DrugBugButton;
