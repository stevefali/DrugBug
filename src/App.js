import logo from "./logo.svg";
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
  postWebPushEndpoint,
} from "./utils/networkUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import DoseEditPage from "./pages/DoseEditPage/DoseEditPage";
import DoseAddPage from "./pages/DoseEditPage/DoseAddPage";
import NotificationAPI from "notificationapi-js-client-sdk";
import AccountPage from "./pages/AccountPage/AccountPage";

function App() {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "DrugBug";

    const token = sessionStorage.getItem("token");
    if (!token) {
      setFailedAuth(true);
    }

    if (!user) {
      fetchAuthorizedUser(token);
    }
  }, []);

  const sendWebPushTokens = async (pushSub) => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.post(postWebPushEndpoint(), pushSub, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigator.serviceWorker.ready.then((worker) => {
        worker.pushManager
          .permissionState({ userVisibleOnly: true })
          .then((perm) => {
            console.log(perm);
            if (perm === "prompt") {
              const notificationApi = new NotificationAPI({
                clientId: process.env.REACT_APP_NOTIFICATIONAPI_CLIENT_ID,
                userId: user.id.toString(),
              });
              notificationApi.askForWebPushPermission();
            }
            if (perm === "granted") {
              worker.pushManager.getSubscription().then((sub) => {
                sendWebPushTokens(sub.toJSON());
              });
            }
          });
      });
    }
  }, [user]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  return (
    <BrowserRouter>
      <Header
        user={user}
        handleLogout={handleLogout}
        sendWebPushTokens={sendWebPushTokens}
      />
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
        <Route path="/medication" element={<AddEditPage isAdd={true} />} />
        <Route
          path="/medication/:medId"
          element={<AddEditPage isAdd={false} />}
        />
        <Route path="/newdose/:medicationId" element={<DoseAddPage />} />
        <Route path="/dose/:doseId" element={<DoseEditPage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage user={user} />} />
        <Route
          path="/account"
          element={
            <AccountPage
              handleLogout={handleLogout}
              currentUser={user}
              setCurrentUser={fetchAuthorizedUser}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
