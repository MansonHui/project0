import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConfirmParentAC() {
  const [email, setEmail] = useState("chantaiming@gmail.com");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createParent`,
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

      const [result] = await response.json();

      if (result.status === 200) {
        setSnackbarMessage(result.msg);
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage(result.msg);
        setSnackbarSeverity("error");
      }

      // if (response.ok) {
      //   await fetch(
      //     `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createParent`,
      //     {
      //       method: "POST",
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         email: email,
      //       }),
      //     }
      //   );
      //   setSnackbarMessage("Confirm Parent OK");
      //   setSnackbarSeverity("success");
      // } else {
      //   setSnackbarMessage("Confirm Parent Not OK");
      //   setSnackbarSeverity("error");
      // }
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error registering Parent:", error);
      setSnackbarMessage("Confirm Parent Not OK");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div id={styles.confirmParentACFrom}>
          <input
            id={styles.confirmParentACInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
          <Button
            id={styles.confirmParentACButton}
            type="submit"
            variant="contained"
            color="success"
          >
            Confirm
          </Button>
        </div>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
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
}
