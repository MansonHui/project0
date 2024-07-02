import { useGetTeacherNotice } from "../../api/teacherPageAPI"
import styles from "./TeacherNoticePage.module.css"



export default function TeacherNoticePage (){
    const allTeacherNotice = useGetTeacherNotice()

    return (
        <div>
            
            <div className={styles.MainContainer}>
            
            {allTeacherNotice.map((entry) => (
                <div className={styles.Noitce}>
                    <div className={styles.Grade}> Notice: {entry.school_year}  Grade: {entry.grade}{entry.class_name} </div>
                    <div className={styles.Topic}> 
                        <p>Notice: No{entry.notice_id}</p> 
                        <p>Topic:  {entry.notices_topic}</p> 
                    </div>
                
                </div>

            ))}
            
                
            </div>
        </div>
    )
}