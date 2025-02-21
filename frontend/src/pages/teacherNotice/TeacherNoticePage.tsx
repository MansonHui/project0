import { useNavigate } from "react-router-dom";
import {
  // useGetNoticeByNoticeID,
  useGetTeacherNotice,
} from "../../api/teacherPageAPI";
import styles from "./TeacherNoticePage.module.css";

export default function TeacherNoticePage() {
  const allTeacherNotice = useGetTeacherNotice();
  // const useNoticeByNoticeID = useGetNoticeByNoticeID();

  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.MainContainer}>
        {allTeacherNotice.map((entry) => (
          <div
            onClick={() => {
              navigate("../TeacherNoticeDetail", {
                state: {
                  notice_id: entry.notice_id,
                  type: "notice",
                },
              });
            }}
            className={styles.Noitce}
          >
            <div className={styles.Grade}>
              {" "}
              Notice: {entry.school_year} Grade: {entry.grade}
              {entry.class_name}{" "}
            </div>
            <div className={styles.Topic}>
              <p id={styles.topicNoticeNo}>
                <p className={styles.PLayout}>Notice:</p>
                <p className={styles.PLayout}>No{entry.notice_id}</p>
              </p>
              <p id={styles.topicTopic}>
                <p className={styles.PLayout}>
                  Topic:
                  <p />
                </p>
                <p className={styles.PLayout}>{entry.notices_topic}</p>
              </p>

              <p id={styles.topicCreated}>
                <p className={styles.PLayout}>Created:</p>
                <p className={styles.PLayout}>
                  {new Date(entry.created_at).toLocaleDateString("zh-TW", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                  <br />
                </p>
              </p>
              <button id={styles.topicShowContect}>Show Contect</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
