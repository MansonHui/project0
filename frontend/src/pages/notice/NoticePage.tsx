import { useGetallNotice_Attendance } from "../../api/noticePageAPI";
import styles from "./NoticePage.module.css"



export default function NoticePage(){
    const allNotice_Attendance = useGetallNotice_Attendance();

    return(
        <div>
            {allNotice_Attendance.map((entry) => (
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
                    ))}
        </div>
    )
}