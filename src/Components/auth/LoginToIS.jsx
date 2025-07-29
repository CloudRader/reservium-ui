import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import PulsatingLoader from "../ui/PulsatingLoader.jsx";

/**
 * Gets the login URL from the server and redirects the user to it.
 */
const LoginToIS = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${API_BASE_URL}/users/login`, {
          cache: "no-store",
        });
        window.location.href = response.data;
      } catch (error) {
        // alert('Error fetching login URL:' + error);
        console.error("Error fetching login URL:", error);
        setTimeout(() => navigate("/"), 10);
      }
    };
    fetchLoginUrl();
  }, [navigate]);

  return <PulsatingLoader />;
};

export default LoginToIS;
