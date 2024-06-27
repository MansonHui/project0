import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("loginToken") || null
  );
  console.log("useAuth in effect")

  useEffect(() => {
    setAuthToken(localStorage.getItem("loginToken" || null));
  });

  const navigate = useNavigate();
  const login = (token: string) => {
    localStorage.setItem("loginToken", token);
    setAuthToken(token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("loginToken");
    setAuthToken(null);
    navigate("/");
  };
  return { authToken, login, logout };
};
