import { Outlet, useNavigate } from "react-router-dom";
import { getNoticeType, useGetallNotice } from "../../api/noticePageAPI";
import styles from "./NoticePage.module.css";
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import BoyIcon from '@mui/icons-material/Boy';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';

export default function NoticePage() {
  const allNotice = useGetallNotice();
  const navigate = useNavigate();

  return (
    <div className={styles.Container}>
      {allNotice.map((entry) => (
        <div
          // key={entry.notice_id}
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
            <div><SchoolIcon/> School: </div>
            <div>{entry.full_name}</div>
          </div>
          <div className={styles.Message_type}>
            <div>
              <ClassIcon/>Class: {entry.grade}
              {entry.class_name}
            </div>
            <div>
              <BoyIcon/>Student: {entry.last_name} {entry.first_name}
            </div>
          </div>
          <div className={styles.Message_Detail}>
            <div>
              <div><EmailIcon/>Notice:</div>
              <div>{entry.topic}</div>
              <p></p>
              <div><EventIcon/>Created Date:</div>
              <div><div>{new Date(entry.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div></div>
              
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
