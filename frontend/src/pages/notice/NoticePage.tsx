import { useGetallNotice } from "../../api/noticePageAPI";
import styles from "./NoticePage.module.css"



export default function NoticePage(){
    const allNotice = useGetallNotice();

    return(
        <div>
            {allNotice.map((entry) => (
                    <div className={styles.Message}>
                        <div className={styles.Message_type}>
                            <div>School: {entry.full_name}</div>
                        </div>
                        <div className={styles.Message_type}>
                            <div>Class: {entry.grade}{entry.class_name}</div>
                            <div>Student: {entry.last_name} {entry.first_name}</div>
                        </div>
                        <div className={styles.Message_Detail}>
                            <div>
                            {entry.topic}
                            {entry.created_at}
                            
                            </div>
                        </div>
                    </div>
                    ))}
        </div>
    )
}