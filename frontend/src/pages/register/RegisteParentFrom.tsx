import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ConfirmParentAC from "./ConfirmParentAC";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const RegisteParentFrom = () => {
  const [email, setEmail] = useState("chantaiming@gmail.com");
  const [password, setPassword] = useState("5678");
  const [activeComponent, setActiveComponent] = useState<
    "ConfirmParentAC" | null
  >(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
  >("success");

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
      setSnackbarOpen(true);
      setSnackbarMessage("Register parent successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error registering Parent:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("Failed to register parent.");
      setSnackbarSeverity("error");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );

  return <div>{registeParent}</div>;
};

export default RegisteParentFrom;