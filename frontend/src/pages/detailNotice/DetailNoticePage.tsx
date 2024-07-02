import styles from "./DeatailNoticePage.module.css"
import { getNoticeType, useGetallNotice } from "../../api/noticePageAPI";
import { useNavigate } from "react-router-dom";




export default function DetailNoticePage(){
    const navigate = useNavigate();
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
                            {entry.content}
                            </div>
                            <div>
                            {entry.created_at}
                            </div>
                        </div>

                        <button onClick={() => {navigate(-1);}}>Go Back</button>
                    </div>
                    
                    ))}

                    
        </div>
    )
}