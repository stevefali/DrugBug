import Button from "react-bootstrap/Button";

import "./DrugBugButton.scss";

const DrugBugButton = ({ text, handleClick, variant = "success" }) => {
  return (
    <Button
      onClick={handleClick}
      variant={variant}
      type="submit"
      className="drugbug-button"
    >
      {text}
    </Button>
  );
};

export default DrugBugButton;
