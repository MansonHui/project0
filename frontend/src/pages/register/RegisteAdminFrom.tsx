import { useEffect, useState } from "react";
import styles from "./RegisterPage.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const RegisteAdminFrom: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createAdmin`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const registeTeacher = (
    <form onSubmit={handleSubmit} id={styles.RegisteAdminFrom}>
      <div id={styles.registeAdminIcon}></div>
      <div id={styles.registeAdminInfo}>
        <Box>
          <TextField
            id={styles.registeAdimnInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </Box>
        <p />

        <Button
          id={styles.registeAdminButton}
          type="submit"
          variant="contained"
          color="success"
        >
          Register
        </Button>
      </div>
    </form>
  );

  return <div>{registeTeacher}</div>;
};

export default RegisteAdminFrom;
