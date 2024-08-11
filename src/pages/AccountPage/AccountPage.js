import { useEffect, useRef, useState } from "react";
import "./AccountPage.scss";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {
  deleteUserEndpoint,
  putEditUserEndpoint,
} from "../../utils/networkUtils";
import axios from "axios";
import { useNavigate } from "react-router";
import DrugBugButton from "../../components/DrugBugButton/DrugBugButton";

const AccountPage = ({ handleLogout, currentUser, setCurrentUser }) => {
  const [confirm, setConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(currentUser);

  let initialFormValues = {
    first_name: user ? user.first_name : "",
    last_name: user ? user.last_name : "",
    email: user ? user.email : "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const navigate = useNavigate();
  const formRef = useRef();

  const handleFormValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    event.target.setCustomValidity("");
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setIsEdit(true);
    setFormValues({
      first_name: user ? user.first_name : "",
      last_name: user ? user.last_name : "",
      email: user ? user.email : "",
    });
  };
  const handleCancelEdit = (event) => {
    event.preventDefault();
    setIsEdit(false);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const current = formRef.current;
    if (
      !!formValues.first_name.trim() &&
      !!formValues.last_name.trim() &&
      !!formValues.email.trim()
    ) {
      // TODO: Call server to edit user
      editAccount(formValues);
    } else {
      if (!formValues.first_name.trim()) {
        current.first_name.setCustomValidity("Invalid Entry");
        console.log("nope firstName");
      }
      if (!formValues.last_name.trim()) {
        current.last_name.setCustomValidity("Invalid Entry");
      }
      if (!formValues.email.trim()) {
        current.email.setCustomValidity("Invalid Entry");
      }
    }
  };

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

  const editAccount = async (updatedUser) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(putEditUserEndpoint(), updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(token);
      alert("Account successfully updated.");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
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

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <main className="drugbug__page">
      <Container>
        <h1>My Account</h1>
        <section className="account-info">
          <h3 className="account-info__item">{`${user.first_name} ${user.last_name}`}</h3>
          <h5 className="account-info__item">{user.email}</h5>
        </section>
        <div className="account-edit">
          <DrugBugButton
            text={"Edit Account"}
            variant="success"
            handleClick={handleEdit}
            disabled={isEdit}
          />
          {isEdit && (
            <Form className="account-edit__form" ref={formRef}>
              <div className="account-edit__row">
                <Form.Group className="mb-3 account-edit__form__item">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={formValues.first_name}
                    onChange={handleFormValueChange}
                    className="account-edit__input"
                  />
                </Form.Group>
                <Form.Group className="mb-3 account-edit__form__item">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={formValues.last_name}
                    onChange={handleFormValueChange}
                    className="account-edit__input"
                  />
                </Form.Group>

                <Form.Group className="mb-3 account-edit__form__item">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleFormValueChange}
                    className="account-edit__input account-edit__input--email"
                  />
                </Form.Group>
              </div>
              <div className="account-edit__buttons">
                <DrugBugButton
                  text={"Submit"}
                  variant="success"
                  handleClick={handleSubmitForm}
                />
                <DrugBugButton
                  text={"Cancel"}
                  variant="outline-secondary"
                  handleClick={handleCancelEdit}
                />
              </div>
            </Form>
          )}
        </div>
        <div className="account-delete">
          <DrugBugButton
            text={"Delete Account"}
            variant="secondary"
            handleClick={handleDelete}
            disabled={confirm}
          />
        </div>
        {confirm && (
          <div className="account-delete__confirm">
            <p className="account-delete__inform">
              Are you sure you want to delete your account?
            </p>
            <p className="account-delete__inform">
              This action can not be undone!
            </p>
            <div className="account-delete__confirm__buttons">
              <DrugBugButton
                text={"Cancel"}
                variant="outline-secondary"
                handleClick={handleCancelConfirm}
              />
              <DrugBugButton
                text={"Confirm Delete"}
                variant="secondary"
                handleClick={handleConfirmed}
              />
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};

export default AccountPage;
