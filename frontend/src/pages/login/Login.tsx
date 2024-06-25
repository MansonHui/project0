import React, { useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./Login.module.css";
import { useFetch } from "./customLoginFetch";
import { useNavigate } from 'react-router-dom';

export default function Login(props: any) {
  let data = useFetch("http://localhost:3000/Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here
    if (email === "admin@admin.com" && password === "123") {
      // If the login is successful, set the isLoggedIn value in the local storage
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/'); // Navigate to the HomePage
    } else {
      setError("Invalid email or password");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleLogin();
    props.setFormDone(true);
  };

  const loginForm = (
    <form onSubmit={handleSubmit} id={styles.loginCore}>
      <div id={styles.loginInputBar}>
        <div id={styles.welcome}>Welcome</div>
        <div id={styles.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </div>
        <div id={styles.password}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
      </div>
      <input type="submit" value="Login" />
      {error && <div>{error}</div>}
    </form>
  );
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box id={styles.loginContainer}>
      <div id={styles.bannerContainer}>
        <div id={styles.loginBanner}>BANNER</div>
      </div>
      <div id={styles.privacyPolicyAndOption}>
        <div>
          <label id={styles.privacyPolicy}>"Personal privacy policy"</label>
          <div id={styles.agreeOptionBox}>
            <FormControlLabel
              id={styles.agreeOption}
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Agree"
            />
          </div>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            {loginForm}
          </Slide>
        </div>
      </div>
    </Box>
  );
}