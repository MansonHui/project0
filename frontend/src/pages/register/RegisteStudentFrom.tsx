import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const RegisteStudentFrom: React.FC = () => {
  const [email, setEmail] = useState<string>("chantaiming@gmail.com");
  const [first_name, setFirst_name] = useState<string>("adams");
  const [last_name, setLast_name] = useState<string>("ip");
  const [HKID_number, setHKID_number] = useState<string>("A1234");
  const [birthday, setBirthday] = useState<string>("2024-07-12");
  const [gender, setGender] = useState<string>("M");
  const [grade, setGrade] = useState<string>("1");
  const [className, setClassName] = useState<string>("A");
  const [success, setSuccess] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [showTakeProfilePictureButton, setShowTakeProfilePictureButton] =
    useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createStudent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            first_name: first_name,
            last_name: last_name,
            HKID_number: HKID_number,
            birthday: birthday,
            gender: gender,
            grade: grade,
            className: className,
          }),
        }
      );

      const response = await res.json();

      console.log("response", response);

      if (res.ok) {
        console.log("dataFromServer", response.newStudentDetail);
        localStorage.setItem(
          "newStudentId",
          JSON.stringify(response.newStudentDetail)
        );
        setSuccess(true);
        setOpen(true);
        setShowTakeProfilePictureButton(true);
      } else {
        setSuccess(false);
        setOpen(true);
        setShowTakeProfilePictureButton(false);
      }
    } catch (error) {
      console.error("Error registering Student:", error);
      setSuccess(false);
      setOpen(true);
      setShowTakeProfilePictureButton(false);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();
  const handleNavigation = () => {
    let value = localStorage.getItem("newStudentId");
    if (value) {
      navigate("/AI");
    } else {
      alert("Please complete the student registration first.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id={styles.RegisteStudentFrom}>
        <div id={styles.registeStudentIconAndButton}>
          <div id={styles.registeStudentIcon}></div>
          <Button
            id={styles.registeStudentButton}
            type="submit"
            variant="contained"
            color="success"
          >
            Register
          </Button>

          {showTakeProfilePictureButton && (
            <Button
              onClick={handleNavigation}
              variant="contained"
              color="success"
            >
              Take profile picture
            </Button>
          )}
        </div>

        <div id={styles.registeStudentInfo}>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="text"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              placeholder="first_name"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="text"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              placeholder="last_name"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="gender"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="text"
              value={HKID_number}
              onChange={(e) => setHKID_number(e.target.value)}
              placeholder="HKID_number"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="birthday"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="grade"
              required
            />
          </Box>

          <Box>
            <input
              className={styles.registeStudentInput}
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="className"
              required
            />
          </Box>

          <p />
        </div>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success
            ? "Student registration successful!"
            : "Student registration failed. Please try again."}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisteStudentFrom;