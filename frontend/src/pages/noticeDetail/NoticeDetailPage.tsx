import { useGetNoticeDetail } from "../../api/noticeDetailPageAPI";
import styles from "./NoticeDetailPage.module.css";

import { useLocation, useNavigate } from "react-router-dom";

export default function NoticeDetailPage() {
  const navigate = useNavigate();
  let location = useLocation();
  console.log("location", location);

  const NoticeDetail = useGetNoticeDetail(
    location.state.notice_id,
    location.state.student_id
  );

  return (
    <div>
      {NoticeDetail.map((entry) => (
        <div className={styles.Message}>
          <div className={styles.Message_type}>
            <div>School: {entry.school_name}</div>
          </div>
          <div className={styles.Message_type}>
            <div>
              Class: {entry.grade}
              {entry.class_name}
            </div>
            <div>
              Student: {entry.last_name} {entry.first_name}
            </div>
          </div>
          <div className={styles.Message_Detail}>
            <div>
              {entry.topic}
              {entry.notice_content}
            </div>
            <div>{entry.notice_created_at}</div>
          </div>

          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>
        </div>
      ))}
    </div>
  );
}
