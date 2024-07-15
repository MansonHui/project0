import { useEffect, useState } from "react";
import styles from "./RegisterPage.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const RegisteAdminFrom: React.FC = () => {
  const [email, setEmail] = useState("newteacher@stpeter.edu.hk");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
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

      const [result] = await response.json();

      if (result.status === 200) {
        setSuccess(true);
        setMsg(result.msg);
      } else {
        setSuccess(false);
        setMsg(result.msg);
      }
      setOpen(true);
    } catch (error) {
      console.error("Error registering user:", error);
      setSuccess(false);
      setOpen(true);
    }
  };

  interface CustomAlertProps extends AlertProps {
    message: string;
  }

  const Alert = React.forwardRef<HTMLDivElement, CustomAlertProps>(
    function Alert({ message, onClose, severity, ...props }, ref) {
      return (
        <MuiAlert
          elevation={6}
          ref={ref}
          variant="filled"
          severity={severity}
          {...props}
        >
          {message}
        </MuiAlert>
      );
    }
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const registeTeacher = (
    <form onSubmit={handleSubmit} id={styles.registeAdminFrom}>
      <div id={styles.registeAdminIconAndButton}>
        <div id={styles.registeAdminIcon}></div>
        <Button
          id={styles.registeAdminButton}
          type="submit"
          variant="contained"
          color="success"
        >
          Register
        </Button>
      </div>
      <div id={styles.registeAdminInfo}>
        <Box>
          <input
            id={styles.registeAdimnInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </Box>
      </div>
    </form>
  );

  return (
    <div>
      {registeTeacher}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          message={msg}
          sx={{ width: "100%" }}
        >
          {/* {success
            ? "Register admin successful!"
            : "Register admin failed. Please try again."} */}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisteAdminFrom;
