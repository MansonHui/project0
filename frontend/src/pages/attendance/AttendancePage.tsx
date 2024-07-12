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
              Name: {entry.last_name.charAt(0).toUpperCase() + entry.last_name.slice(1)}
              {entry.first_name}
            </div>
          </div>
          <div className={styles.Message_type}>
            <div>In_Out: {entry.in_out.charAt(0).toUpperCase() + entry.in_out.slice(1)}</div>
            <div></div>
          </div>
          <div className={styles.Message_Detail}>
            <div>{new Date(entry.created_at).toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
