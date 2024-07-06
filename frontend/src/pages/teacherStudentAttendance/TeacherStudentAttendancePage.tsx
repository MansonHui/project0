import { useNavigate } from "react-router-dom";
import styles from "./TeacherStudentAttendancePage.module.css"
import { useGetTeacherStudentAttendance } from "../../api/teacherStudentAttendancePageAPI";

export default function TeacherStudentAttendance(){
    const navigate = useNavigate();
    const getTeacherStudentAttendance = useGetTeacherStudentAttendance();

    return(

        <div>
            <div className={styles.MainContainer}>
            {getTeacherStudentAttendance.map((entry)=> (
                

                <div className={styles.InOutContainer}>
                    <div className={styles.InOutTopContainer}>
                        Class: {entry.class_grade}{entry.class_name}
                        
                        Data: {new Date(entry.attendance_date).toLocaleDateString()}
                    </div>
                    <div className={styles.InOutDownContainer}>
                        <div className={styles.InContainer}>
                            <div className={styles.leftContainer}>In</div>
                            <div className={styles.rightContainer}>{entry.total_in}</div>
                        </div>
                        <div className={styles.OutContainer}>
                            <div className={styles.leftContainer}>Out</div>
                            <div className={styles.rightContainer}>{entry.total_out}</div>
                        </div>
                    </div>
                    
                </div>


            
            ))}
            
            </div>


            <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>


        </div>
        
    )
}