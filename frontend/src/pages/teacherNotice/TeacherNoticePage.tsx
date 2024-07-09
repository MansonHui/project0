import { useNavigate } from "react-router-dom"
import { useGetTeacherNotice } from "../../api/teacherPageAPI"
import styles from "./TeacherNoticePage.module.css"



export default function TeacherNoticePage (){
    const allTeacherNotice = useGetTeacherNotice()
    const navigate = useNavigate();

    return (
        <div>
            
            <div className={styles.MainContainer}>
            
            {allTeacherNotice.map((entry) => (
                <div onClick={()=> {navigate("../TeacherNoticeDetail",{
                    state:{
                        notice_id: entry.notice_id,
                        type: "notice",
                    }
                }
            )}} 
                className={styles.Noitce}>
                    <div className={styles.Grade}> Notice: {entry.school_year}  Grade: {entry.grade}{entry.class_name} </div>
                    <div className={styles.Topic}> 
                        <p>Notice: No{entry.notice_id}</p> 
                        <p>Topic:  {entry.notices_topic}</p> 
                        <p>Created: {entry.created_at}</p>
                    </div>
                
                </div>

            ))}
            
                
            </div>
        </div>
    )
}