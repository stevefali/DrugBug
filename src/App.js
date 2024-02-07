import "./App.scss";
import "bootswatch/dist/minty/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddEditPage from "./pages/AddEditPage/AddEditPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import SignupPage from "./pages/SignupPage/SignupPage";
import {
  getCurrentUserEndpoint,
  getUserMedicationsEndpoint,
} from "./utils/networkUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import DoseEditPage from "./pages/DoseEditPage/DoseEditPage";
import DoseAddPage from "./pages/DoseEditPage/DoseAddPage";

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <BrowserRouter>
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/medication" element={<AddEditPage isAdd={true} />} />
        <Route
          path="/medication/:medId"
          element={<AddEditPage isAdd={false} />}
        />
        <Route path="/newdose/:medicationId" element={<DoseAddPage />} />
        <Route path="/dose/:doseId" element={<DoseEditPage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage user={user} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
