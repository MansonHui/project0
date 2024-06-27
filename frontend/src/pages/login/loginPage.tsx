import React, { useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("chantaiming@gmail.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const reponse = await res.json();

    if (res.ok) {
      login(reponse.token)
    }else{
      alert("Login failed")
    }

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
