import styles from "./Navbar.module.css";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AnnouncementRoundedIcon from "@mui/icons-material/AnnouncementRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    // ------------ Navbar Logo Container ------------
    <div className={styles.navbar_container}>
      <div className={styles.navbar_logo_container}></div>

      {/* ------------ Navbar Function Container ------------ */}
      <div>
        <Button
          variant="outlined"
          onClick={() => navigate("HomePage")}
          className={styles.navbar_function}
        >
          <Button className={styles.navbar_function_logo}>
            <HomeSharpIcon />
          </Button>
          <Button className={styles.navbar_function_text}>Home</Button>
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("Message")}
          className={styles.navbar_function}
        >
          <Button className={styles.navbar_function_logo}>
            <AnnouncementRoundedIcon color="action" />
          </Button>
          <Button className={styles.navbar_function_text}>
            Instant Messaging
          </Button>
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("EditNotice")}
          className={styles.navbar_function}
        >
          <Button className={styles.navbar_function_logo}>
            <EmailRoundedIcon color="action" />
          </Button>
          <Button className={styles.navbar_function_text}>
            Editorial Notice
          </Button>
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("AI")}
          className={styles.navbar_function}
        >
          <Button className={styles.navbar_function_logo}>
            <StickyNote2RoundedIcon color="action" />
          </Button>
          <Button className={styles.navbar_function_text}>
            AI Attendances
          </Button>
        </Button>
        <Button variant="outlined" className={styles.navbar_function}>
          <Button className={styles.navbar_function_logo}>
            <StickyNote2RoundedIcon color="action" />
          </Button>
          <Button className={styles.navbar_function_text}>
            School Payment
          </Button>
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("Register")}
          className={styles.navbar_function}
        >
          <Button className={styles.navbar_function_logo}>
            <StickyNote2RoundedIcon color="action" />
          </Button>
          <Button className={styles.navbar_function_text}>Register</Button>
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("TeacherNotice")}
          className={styles.navbar_function}
        >
          <Button className={styles.navbar_function_logo}>
            <StickyNote2RoundedIcon color="action" />
          </Button>
          <Button className={styles.navbar_function_text}>TeacherNotice</Button>
        </Button>
      </div>
    </div>
  );
}
