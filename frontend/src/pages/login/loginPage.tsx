import React, { useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PopuploginPrivacyPolicy from "./loginPrivacyPolicy";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
  // super admin AC and password
  // const [email, setEmail] = useState("super@stpeter.edu.hk");
  // const [password, setPassword] = useState("stpeter");
  // teacher AC and password
  const [email, setEmail] = useState("choiping@stpeter.edu.hk");
  const [password, setPassword] = useState("0000");
  // // parent AC and password
  // const [email, setEmail] = useState("chantaiming@gmail.com");
  // const [password, setPassword] = useState("1234");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(loginForm);
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        login(data.token);
      } else {
        const error = await response.json();
        setError(error.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
    }
  };

  const loginForm = (
    <form onSubmit={handleSubmit} id={styles.loginCore}>
      <div id={styles.loginInputBar}>
        <div id={styles.welcome}>Welcome</div>
        <Box id={styles.email}>
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </Box>
        <Box id={styles.password}>
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </Box>
      </div>

      <Button
        id={styles.sendButton}
        variant="contained"
        color="success"
        startIcon={<LoginIcon />}
        type="submit"
      >
        SEND
      </Button>
      {error && <div>{error}</div>}
    </form>
  );
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div id={styles.loginBody}>
      <div id={styles.ecParentLogo}></div>
      <Box>
        <div id={styles.loginContainer}>
          <div id={styles.loginCoreBackground}>
            <div id={styles.privacyPolicyAndOption}>
              <label id={styles.privacyPolicy}>
                <PopuploginPrivacyPolicy
                  id={styles.popupButton}
                  buttonLabel="privacyPolicy"
                  strategy="fixed"
                />
              </label>

              <div id={styles.agreeOptionBox}>
                <FormControlLabel
                  id={styles.agreeOption}
                  control={<Switch checked={checked} onChange={handleChange} />}
                  label="Agree"
                />
                <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                  {loginForm}
                </Slide>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
