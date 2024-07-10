import { useNavigate } from "react-router-dom";
import { useGetallNotice } from "../../api/noticePageAPI";
import styles from "./NoticePage.module.css";

export default function NoticePage() {
  const allNotice = useGetallNotice();
  const navigate = useNavigate();

  return (
    <div className={styles.Container}>
      {allNotice.map((entry) => (
        <div
          onClick={() => {
            navigate("../NoticeDetail", {
              state: {
                notice_id: entry.notice_id,
                type: "notice",
                student_id: entry.student_id,
              },
            });
          }}
          className={styles.Message}
        >
          <div className={styles.Message_type}>
            <div id={styles.iconAndName}>
              School:{" "}
            </div>
            <div>{entry.full_name}</div>
          </div>

          <div className={styles.Message_type}>
            <div id={styles.iconAndName}>
             
              Class: {entry.grade}
              {entry.class_name}
            </div>
            <div id={styles.iconAndName}>
             
              Student: {entry.last_name} {entry.first_name}
            </div>
          </div>

          {/* <div className={styles.Message_Detail}> */}
          <div className={styles.Message_type}>
            <div id={styles.iconAndName}>
           
              Notice:
            </div>
            <div> {entry.topic}</div>
          </div>

          <div className={styles.Message_type}>
            <div>
          
              Created Date:
            </div>
            <div>
              {new Date(entry.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
