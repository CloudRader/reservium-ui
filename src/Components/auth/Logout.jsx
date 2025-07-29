import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginInfoPage from "../../pages/LoginInfoPage.jsx";
import { API_BASE_URL } from "../../constants";
axios.defaults.withCredentials = true;

function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        await axios.get(`${API_BASE_URL}/users/logout`);
      } catch (error) {
        console.error("Error while log out", error);
      }
    };
    fetchLoginUrl();
    onLogout();
  }, [onLogout, navigate]);

  return <LoginInfoPage />;
}

export default Logout;
