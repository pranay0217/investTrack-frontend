import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) return; // Prevent double runs (optional in strict mode)
    
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get("username");
    const email = queryParams.get("email");
    const token = queryParams.get("token");

    console.log("GoogleCallback params:", { username, email, token });

    if (username && email && token) {
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);

      setChecked(true);
      navigate("/Dashboard");
    } else {
      alert("Google login Successfull...");
    }
  }, [checked, navigate]);

  return <p>Logging in with Google...</p>;
};

export default OAuthCallback;
