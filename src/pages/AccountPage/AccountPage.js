import { useState } from "react";
import "./AccountPage.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { deleteUserEndpoint } from "../../utils/networkUtils";
import axios from "axios";
import { useNavigate } from "react-router";

const AccountPage = ({ handleLogout }) => {
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate();

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
    deleteAccount();
  };

  const deleteAccount = async () => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(deleteUserEndpoint(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Account deleted.");
      handleLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
