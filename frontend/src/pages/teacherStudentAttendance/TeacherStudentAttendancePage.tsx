import { useNavigate } from "react-router-dom";
import styles from "./TeacherStudentAttendancePage.module.css";
import { useGetTeacherStudentAttendance } from "../../api/teacherStudentAttendancePageAPI";
import { Button } from "@mui/material";

export default function TeacherStudentAttendance() {
  const navigate = useNavigate();
  const getTeacherStudentAttendance = useGetTeacherStudentAttendance();

  return (
    <div>
      <div className={styles.MainContainer}>
        {getTeacherStudentAttendance.map((entry) => (
          <div className={styles.InOutContainer}>
            <div>
              <div className={styles.InOutClassContainer}>
                <div className={styles.InOutClassGrandAndName}>
                  {/* <div>Name:CHAN TAI MAN</div> */}
                  <div>
                    Class: {entry.class_grade}
                    {entry.class_name}{" "}
                  </div>
                  <div className={styles.InOutClassName}></div>
                  Data: {new Date(entry.attendance_date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className={styles.InOutDownContainer}>
              <div className={styles.InContainer}>
                <div className={styles.leftContainer} id={styles.checkin}>
                  <div className={styles.charmtickdouble}></div>Check-In
                </div>
                <div className={styles.rightContainer}>
                  {entry.total_in}
                  {/* <div>2024-07-10 </div>
                  <div>08:00 </div> */}
                </div>
              </div>
              <div className={styles.OutContainer}>
                <div className={styles.leftContainer} id={styles.checkout}>
                  <div className={styles.fasignout}></div>
                  Check-Out
                </div>
                <div className={styles.rightContainer}>
                  {entry.total_out}
                  {/* <div>2024-07-10 </div>
                  <div>15:30 </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      

      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </Button>
    </div>
  );
}
