import RegisteAdminFrom from "./RegisteAdminFrom";
import RegisteParentFrom from "./RegisteParentFrom";
import RegisteStudentFrom from "./RegisteStudentFrom";
import ConfirmParentAC from "./ConfirmParentAC";
import styles from "./RegisterPage.module.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const Navbar: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<
    "RegisteAdminFrom" | "RegisteParentFrom" | "RegisteStudentFrom" | null
  >(null);

  const handleButtonClick = (
    component: "RegisteAdminFrom" | "RegisteParentFrom" | "RegisteStudentFrom"
  ) => {
    if (activeComponent === component) {
      setActiveComponent(null);
    } else {
      setActiveComponent(component);
    }
  };

  return (
    <div id={styles.registeFromPage}>
      <nav id={styles.navbarButton}>
        <Button
          id={styles.studentButton}
          startIcon={
            activeComponent === "RegisteStudentFrom" ? (
              <CancelIcon />
            ) : (
              <AddCircleOutlineIcon />
            )
          }
          variant={
            activeComponent === "RegisteStudentFrom" ? "outlined" : "contained"
          }
          color={activeComponent === "RegisteStudentFrom" ? "error" : "primary"}
          onClick={() => handleButtonClick("RegisteStudentFrom")}
        >
          {activeComponent === "RegisteStudentFrom" ? "Cloce" : "Student"}
        </Button>

        <Button
          id={styles.parentButton}
          startIcon={
            activeComponent === "RegisteParentFrom" ? (
              <CancelIcon />
            ) : (
              <AddCircleOutlineIcon />
            )
          }
          variant={
            activeComponent === "RegisteParentFrom" ? "outlined" : "contained"
          }
          color={activeComponent === "RegisteParentFrom" ? "error" : "primary"}
          onClick={() => handleButtonClick("RegisteParentFrom")}
        >
          {activeComponent === "RegisteParentFrom" ? "Cloce" : "Parent"}
        </Button>
        <Button
          id={styles.teacherButton}
          startIcon={
            activeComponent === "RegisteAdminFrom" ? (
              <CancelIcon />
            ) : (
              <AddCircleOutlineIcon />
            )
          }
          variant={
            activeComponent === "RegisteAdminFrom" ? "outlined" : "contained"
          }
          color={activeComponent === "RegisteAdminFrom" ? "error" : "primary"}
          onClick={() => handleButtonClick("RegisteAdminFrom")}
        >
          {activeComponent === "RegisteAdminFrom" ? "Cloce" : "Teacher"}
        </Button>
      </nav>
      <div id={styles.registeFromCore}>
        {activeComponent === "RegisteAdminFrom" && <RegisteAdminFrom />}
        {activeComponent === "RegisteParentFrom" && <RegisteParentFrom />}
        {activeComponent === "RegisteStudentFrom" && <RegisteStudentFrom />}
      </div>
    </div>
  );
};

export default Navbar;
