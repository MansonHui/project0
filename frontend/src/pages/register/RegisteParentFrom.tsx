import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ConfirmParentAC from "./ConfirmParentAC";

const RegisteParentFrom = () => {
  const [email, setEmail] = useState("tsangmeimei@gmail.com");
  const [password, setPassword] = useState("12345");
  const [activeComponent, setActiveComponent] = useState<
    "ConfirmParentAC" | null
  >(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createParent`,
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
      setActiveComponent("ConfirmParentAC");
    } catch (error) {
      console.error("Error registering Parent:", error);
    }
  };

  const registeParent = (
    <div>
      <form onSubmit={handleSubmit} id={styles.RegisteParentFrom}>
        <div id={styles.registeParentIconAndButton}>
          <div id={styles.registeParentIcon}></div>
          <Button
            id={styles.registeParentButton}
            type="submit"
            variant="contained"
            color="success"
          >
            Register
          </Button>
        </div>
        <div id={styles.registeParnetInfo}>
          <Box>
            <input
              className={styles.registeParnetInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeParnetInput}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </Box>
        </div>
      </form>
      {activeComponent === "ConfirmParentAC" && <ConfirmParentAC />}
    </div>
  );

  return <div>{registeParent}</div>;
};

export default RegisteParentFrom;