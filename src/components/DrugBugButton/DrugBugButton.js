import Button from "react-bootstrap/Button";

import "./DrugBugButton.scss";

const DrugBugButton = ({
  text,
  handleClick,
  variant = "success",
  disabled = false,
}) => {
  return (
    <Button
      onClick={handleClick}
      variant={variant}
      type="submit"
      className="drugbug-button"
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default DrugBugButton;
