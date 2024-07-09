import { useNavigate } from "react-router-dom";
import { useGetMessageAll } from "../../api/messageAllPageAPI";

import styles from "./MessageAllPage.module.css";

export default function MessageAllPage() {
  const navigate = useNavigate();
  const messageAll = useGetMessageAll();

  return (
    <div id={styles.messageAllPage}>
      {messageAll.status === "success" ? (
        messageAll.data.map((entry) =>
          entry.grade !== null ? (
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
                <div>School: {entry.full_name}</div>
              </div>
              <div className={styles.Message_type}>
                <div>
                  Class: {entry.grade} {entry.class_name}
                </div>
                <div>
                  Student: {entry.last_name} {entry.first_name}
                </div>
              </div>
              <div className={styles.Message_Detail}>
                <div>
                  {entry.topic}
                  {entry.created_at}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.Message}>
              <div className={styles.Message_type}>
                <div>
                  Name: {entry.last_name} {entry.first_name}
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
          )
        )
      ) : (
        <></>
      )}
    </div>
  );
}
