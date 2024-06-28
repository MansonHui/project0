import { Button } from "@mui/material";
import styles from "./MessagePage.module.css";
import { useGetallNotice } from "../../api/noticePageAPI";
import { Outlet, useNavigate } from "react-router-dom";
import MessageAllPage from "../messageAll/MessageAllPage";


export default function MessagePage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.Filter_Container}>
          <Button
            onClick={() => navigate("/Message/MessageAll")}
            variant="outlined"
          >
            All
          </Button>
          <Button
            onClick={() => navigate("/Message/Notices")}
            variant="outlined"
          >
            Notice
          </Button>
          <Button
            onClick={() => navigate("/Message/Attendance")}
            variant="outlined"
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
