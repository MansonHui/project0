import { Button } from "@mui/material";
import styles from "./MessagePage.module.css";
import { useGetallNotice_Attendance } from "../../api/noticePageAPI";
import { useNavigate } from "react-router-dom";

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
                {/* {allNotice_Attendance.map((entry) => (
                    <div className={styles.Message}>
                        <div className={styles.Message_type}>
                            <div>{entry.topic}</div>
                        </div>
                        <div className={styles.Message_Detail}>
                            <div>
                            {entry.content}
                            {entry.created_at}
                            </div>
                        </div>
                    </div>
                    ))} */}
                </div>
                
        </div>
    </div>
  );
}
