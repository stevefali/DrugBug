import Container from "react-bootstrap/Container";

import "./HomePage.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { getUserMedicationsEndpoint } from "../../utils/networkUtils";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [userMedications, setUserMedications] = useState([]);

  // Temporarily set the userId to 3
  const userId = 3;

  const fetchUserMedications = async () => {
    try {
      const response = await axios.get(getUserMedicationsEndpoint(userId));
      //   console.log(response.data);
      setUserMedications(response.data.medications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserMedications();
  }, []);

  return (
    <Container>
      <h1>My Medications</h1>
    </Container>
  );
};

export default HomePage;
