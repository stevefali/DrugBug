import { useState } from "react";
import "./AccountPage.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const AccountPage = () => {
  const [confirm, setConfirm] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    setConfirm(true);
  };

  const handleCancelConfirm = (event) => {
    event.preventDefault();
    setConfirm(false);
  };

  const handleConfirmed = (event) => {
    event.preventDefault();
  };

  return (
    <main>
      <Container>
        <h1>My Account</h1>
        <div className="account-edit">
          <Button variant="success">Edit Account</Button>
        </div>
        <div className="account-delete">
          <Button variant="secondary" onClick={handleDelete} disabled={confirm}>
            Delete Account
          </Button>
          <p className="account-delete__inform">
            (This action can not be undone!)
          </p>
        </div>
        {confirm && (
          <div className="account-delete__confirm">
            <p>Are you sure you want to delete your account?</p>
            <div className="account-delete__confirm__buttons">
              <Button
                variant="outline-secondary"
                className="account-delete__confirm__buttons--cancel"
                onClick={handleCancelConfirm}
              >
                Cancel
              </Button>
              <Button variant="secondary" onClick={handleConfirmed}>
                Confirm Delete
              </Button>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};

export default AccountPage;
