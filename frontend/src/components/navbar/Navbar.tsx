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

export default function Navbar() {
  const navigate = useNavigate();

  return (
    // ------------ Navbar Logo Container ------------
    <div className={styles.navbar_container}>
      <div className={styles.navbar_logo_container}></div>

      {/* ------------ Navbar Function Container ------------ */}
      <div id={styles.navbarMenu}>
        <div
          onClick={() => navigate("HomePage")}
          className={styles.navbarButton}
        >
          <div className={styles.navbar_function_logo}>
            <HomeSharpIcon />
          </div>
          <h6 className={styles.navbar_function_text}>Home</h6>
        </div>
        <div
          onClick={() => navigate("Message")}
          className={styles.navbarButton}
        >
          <div className={styles.navbar_function_logo}>
            <EmailIcon />
          </div>
          <h6 className={styles.navbar_function_text}>Instant Messaging</h6>
        </div>
        <div
          onClick={() => navigate("EditNotice")}
          className={styles.navbarButton}
        >
          <div className={styles.navbar_function_logo}>
            <EditIcon />
          </div>
          <h6 className={styles.navbar_function_text}>Edit Notice</h6>
        </div>

        <div
          onClick={() => navigate("Register")}
          className={styles.navbarButton}
        >
          <div className={styles.navbar_function_logo}>
            <HowToRegIcon />
          </div>
          <h6 className={styles.navbar_function_text}>Register</h6>
        </div>
        <div onClick={() => navigate("AI")} className={styles.navbarButton}>
          <div className={styles.navbar_function_logo}>
            <FaceRetouchingNaturalIcon />
          </div>
          <h6 className={styles.navbar_function_text}>AI Attendances</h6>
        </div>
        <div
          onClick={() => navigate("TeacherNotice")}
          className={styles.navbarButton}
        >
          <div className={styles.navbar_function_logo}>
            <MarkEmailReadIcon />
          </div>
          <h6 className={styles.navbar_function_text}>TeacherNotice</h6>
        </div>
        <div
          onClick={() => navigate("TeacherStudentAttendance")}
          className={styles.navbarButton}
        >
          <div className={styles.navbar_function_logo}>
            <DoneAllIcon />
          </div>
          <h6 className={styles.navbar_function_text}>Attendance</h6>
        </div>

        <div 
          onClick={() => navigate("ParentTopUpBalance")} 
          className={styles.navbarButton}
        >
          <div className={styles.navbar_function_logo}>
            <MonetizationOnIcon />
          </div>
          <h6 className={styles.navbar_function_text}>Payment</h6>
        </div>

      </div>
    </div>
  );
}
