import { useGetallAttendance } from "../../api/attendancePageAPI";
import styles from "./AttendancePage.module.css";

export default function AttendancePage() {
  const allAttendance = useGetallAttendance();

  return (
    <div>
      {allAttendance.map((entry) => (
        <div className={styles.Message}>
          <div className={styles.Message_type}>
            <div>
              Name: {entry.last_name}
              {entry.first_name}
            </div>
          </div>
          <div className={styles.Message_type}>
            <div>In_Out: {entry.in_out}</div>
            <div></div>
          </div>
          <div className={styles.Message_Detail}>
            <div>{entry.created_at}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
