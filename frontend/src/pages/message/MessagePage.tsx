import { Button } from "@mui/material";
import styles from "./MessagePage.module.css";
import { useGetallNotice } from "../../api/noticePageAPI";
import { Outlet, useNavigate } from "react-router-dom";
import MessageAllPage from "../messageAll/MessageAllPage";

export default function MessagePage() {
  const navigate = useNavigate();

  return (
    <div id={styles.messagePageBody}>
      <div className={styles.Container}>
        <div className={styles.Filter_Container}>
          <Button
            onClick={() => navigate("/Message/MessageAll")}
            variant="contained"
            className={styles.bootstrapButton}
          >
            All
          </Button>
          <Button
            onClick={() => navigate("/Message/Notices")}
            variant="contained"
            className={styles.bootstrapButton}
          >
            Notice
          </Button>
          <Button
            onClick={() => navigate("/Message/Attendance")}
            variant="contained"
            className={styles.bootstrapButton}
          >
            Attendances
          </Button>
        </div>

        <div className={styles.Message_Container}>
          <>
            <Outlet />
          </>
        </div>
      </div>
    </div>
  );
}
