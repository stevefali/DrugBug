import Container from "react-bootstrap/Container";

import "./HomePage.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { getUserMedicationsEndpoint } from "../../utils/networkUtils";
import { Stack } from "react-bootstrap";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUserEndpoint } from "../../utils/networkUtils";

const HomePage = (
  {
    // userMedications,
    // failedAuth,
    // setFailedAuth,
    // fetchAuthorizedUser,
  }
) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userMedications, setUserMedications] = useState([]);
  const [failedAuth, setFailedAuth] = useState(false);

  const fetchAuthorizedUser = async (token) => {
    try {
      const response = await axios.get(getCurrentUserEndpoint(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);

      const medResponse = await axios.get(
        getUserMedicationsEndpoint(response.data.id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserMedications(medResponse.data.medications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setFailedAuth(true);
    }

    fetchAuthorizedUser(token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    // navigate("/login");
    return (
      <Container>
        <h1>Welcome to DrugBug</h1>
        <p>Please Login to get started.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </Container>
    );
  }
  // }, []);

  return (
    <Container>
      <h1>My Medications</h1>

      <Stack className="medications-list" gap={3}>
        {userMedications.map((medication) => {
          return <MedicineCard medication={medication} key={medication.id} />;
        })}
      </Stack>
    </Container>
  );
};

export default HomePage;
