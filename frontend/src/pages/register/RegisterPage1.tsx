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
    | "RegisteAdminFrom"
    | "RegisteParentFrom"
    | "RegisteStudentFrom"
    | "ConfirmParentAC"
    | null
  >(null);

  const [showAlreadyHaveACButton, setShowAlreadyHaveACButton] = useState(false);

  const handleButtonClick = (
    component:
      | "RegisteAdminFrom"
      | "RegisteParentFrom"
      | "RegisteStudentFrom"
      | "ConfirmParentAC"
  ) => {
    if (activeComponent === component) {
      setActiveComponent(null);
      if (component === "RegisteParentFrom") {
        setShowAlreadyHaveACButton(false);
      }
    } else {
      setActiveComponent(component);
      if (component === "RegisteParentFrom") {
        setShowAlreadyHaveACButton(true);
      }
    }
  };

  return (
    <div id={styles.registeFromPage}>
      <nav id={styles.navbarButton}>
        <div id={styles.leftButtonArea}>
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
              activeComponent === "RegisteStudentFrom"
                ? "outlined"
                : "contained"
            }
            color={
              activeComponent === "RegisteStudentFrom" ? "error" : "primary"
            }
            onClick={() => handleButtonClick("RegisteStudentFrom")}
          >
            {activeComponent === "RegisteStudentFrom" ? "Close" : "Student"}
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
            {activeComponent === "RegisteAdminFrom" ? "Close" : "Teacher"}
          </Button>
        </div>
        <div id={styles.rightButtonArea}>
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
            color={
              activeComponent === "RegisteParentFrom" ? "error" : "primary"
            }
            onClick={() => handleButtonClick("RegisteParentFrom")}
          >
            {activeComponent === "RegisteParentFrom" ? "Close" : "Parent"}
          </Button>
          {showAlreadyHaveACButton && (
            <Button
              id={styles.alreadyHaveACButton}
              startIcon={
                activeComponent === "ConfirmParentAC" ? (
                  <CancelIcon />
                ) : (
                  <AddCircleOutlineIcon />
                )
              }
              variant={
                activeComponent === "ConfirmParentAC" ? "outlined" : "contained"
              }
              color={
                activeComponent === "ConfirmParentAC" ? "error" : "primary"
              }
              onClick={() => handleButtonClick("ConfirmParentAC")}
            >
              {activeComponent === "ConfirmParentAC" ? "Close" : "Have AC?"}
            </Button>
          )}
        </div>
      </nav>
      <div id={styles.registeFromCore}>
        {activeComponent === "RegisteAdminFrom" && <RegisteAdminFrom />}
        {activeComponent === "RegisteParentFrom" && <RegisteParentFrom />}
        {activeComponent === "ConfirmParentAC" && <ConfirmParentAC />}
        {activeComponent === "RegisteStudentFrom" && <RegisteStudentFrom />}
      </div>
    </div>
  );
};

export default Navbar;