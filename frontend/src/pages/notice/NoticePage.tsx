import { useGetallNotice_Attendance } from "../../api/noticePageAPI";
import styles from "./NoticePage.module.css"



export default function NoticePage(){
    const allNotice_Attendance = useGetallNotice_Attendance();

    return(
        <div>
            {allNotice_Attendance.map((entry) => (
                    <div className={styles.Message}>
                        <div className={styles.Message_type}>
                            <div>School: {entry.full_name}</div>
                        </div>
                        <div className={styles.Message_type}>
                            <div>Class: {entry.grade}{entry.class_name}</div>
                            <div>Student: {entry.last_name} {entry.last_name}</div>
                        </div>
                        <div className={styles.Message_Detail}>
                            <div>
                            {entry.topic}
                            
                            </div>
                        </div>
                    </div>
                    ))}
        </div>
    )
}