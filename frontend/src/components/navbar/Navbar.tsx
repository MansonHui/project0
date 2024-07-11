import styles from "./Navbar.module.css";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import EditIcon from "@mui/icons-material/Edit";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmailIcon from "@mui/icons-material/Email";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const valueString = localStorage.getItem("loginRoleDetail");
  const defaultValue = { role: "guest", userName: "Guest User" };
  const valueObj = JSON.parse(valueString || JSON.stringify(defaultValue));

  const role = valueObj.userRole;
  const userName = valueObj.userName;

  console.log("role:", role);
  console.log("userName:", userName);

  const [userRole, setUserRole] = useState(
    role === "admin" ? (userName === "super" ? "super" : "admin") : "parent"
  );
  console.log(userRole);
  const [showAdminButton, setShowAdminButton] = useState(false);

  const [showParentButton, setShowParentButton] = useState(false);
  const [showSuperAdminButton, setShowSuperAdminButton] = useState(false);

  useEffect(() => {
    // Check if the user is an admin and update state accordingly
    if (userRole === "admin") {
      setShowAdminButton(true);
    } else if (userRole === "parent") {
      setShowParentButton(true);
    } else if (userRole === "super") {
      setShowSuperAdminButton(true);
    }
  }, [userRole]); // This effect will re-run when userRole changes

  return (
    // ------------ Navbar Logo Container ------------
    <div className={styles.navbar_container}>
      <div className={styles.navbar_logo_container}></div>

      {/* ------------ Navbar Function Container ------------ */}
      <div id={styles.navbarMenu}>
        {(showAdminButton || showParentButton) && (
          <div
            onClick={() => navigate("HomePage")}
            className={styles.navbarButton}
          >
            <div className={styles.navbar_function_logo}>
              <HomeSharpIcon />
            </div>
            <h6 className={styles.navbar_function_text}>
              {userRole === "admin" ? "Students' Profile" : "Children Profile"}
            </h6>
          </div>
        )}

        {showParentButton && (
          <div
            onClick={() => navigate("Message")}
            className={styles.navbarButton}
          >
            <div className={styles.navbar_function_logo}>
              <EmailIcon />
            </div>
            <h6 className={styles.navbar_function_text}>
              Check Notices & Attendances
            </h6>
          </div>
        )}

        {showSuperAdminButton && (
          <div
            onClick={() => navigate("EditNotice")}
            className={styles.navbarButton}
          >
            <div className={styles.navbar_function_logo}>
              <EditIcon />
            </div>
            <h6 className={styles.navbar_function_text}>Create Notice</h6>
          </div>
        )}
        {showSuperAdminButton && (
          <div
            onClick={() => navigate("Register")}
            className={styles.navbarButton}
          >
            <div className={styles.navbar_function_logo}>
              <HowToRegIcon />
            </div>
            <h6 className={styles.navbar_function_text}>Register Users</h6>
          </div>
        )}
        {showSuperAdminButton && (
          <div onClick={() => navigate("AI")} className={styles.navbarButton}>
            <div className={styles.navbar_function_logo}>
              <FaceRetouchingNaturalIcon />
            </div>
            <h6 className={styles.navbar_function_text}>AI Attendances</h6>
          </div>
        )}
        {showAdminButton && (
          <div
            onClick={() => navigate("TeacherNotice")}
            className={styles.navbarButton}
          >
            <div className={styles.navbar_function_logo}>
              <MarkEmailReadIcon />
            </div>
            <h6 className={styles.navbar_function_text}>Check Notices</h6>
          </div>
        )}
        {showAdminButton && (
          <div
            onClick={() => navigate("TeacherStudentAttendance")}
            className={styles.navbarButton}
          >
            <div className={styles.navbar_function_logo}>
              <DoneAllIcon />
            </div>
            <h6 className={styles.navbar_function_text}>Check Attendances</h6>
          </div>
        )}

        {showParentButton && showAdminButton && showSuperAdminButton && (
          <div
            onClick={() => navigate("ParentTopUpBalance")}
            className={styles.navbarButton}
          >
            <div className={styles.navbar_function_logo}>
              <MonetizationOnIcon />
            </div>
            <h6 className={styles.navbar_function_text}>Payment</h6>
          </div>
        )}
      </div>
    </div>
  );
}
