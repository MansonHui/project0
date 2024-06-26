import { Button } from "@mui/material";
import styles from "./MessagePage.module.css";
import { useGetallNotice_Attendance } from "../../api/noticePageAPI";
import { useNavigate } from "react-router-dom";
import NoticePage from "../notice/NoticePage";

export default function MessagePage() {
  const allNotice_Attendance = useGetallNotice_Attendance();
  const navigate = useNavigate();

  return (
    <div>
        <div className={styles.Container}>
            <div className={styles.Filter_Container}>
                <Button variant="outlined">All</Button>
                <Button onClick={()=>navigate("Notice")} variant="outlined">Notice</Button>
                <Button variant="outlined">Attendances</Button>
            </div>

            
                <div className={styles.Message_Container}>
               <NoticePage />
                </div>
                
        </div>
    </div>
  );
}
