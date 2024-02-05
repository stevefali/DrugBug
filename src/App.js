import logo from "./logo.svg";
import "./App.scss";
import "bootswatch/dist/minty/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddEditPage from "./pages/AddEditPage/AddEditPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import SignupPage from "./pages/SignupPage/SignupPage";
import { getUserMedicationsEndpoint } from "./utils/networkUtils";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [userMedications, setUserMedications] = useState([]);
  const [failedAuth, setFailedAuth] = useState(false);

  const useriid = 4;
  const fetchUserMedications = async () => {
    try {
      const response = await axios.get(getUserMedicationsEndpoint(useriid));
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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage userMedications={userMedications} />}
        />
        <Route path="/medication" element={<AddEditPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
