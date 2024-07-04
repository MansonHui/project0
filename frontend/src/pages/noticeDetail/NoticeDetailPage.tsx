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
              <div>
                Class: {entry.grade}
                {entry.class_name} StudentNuber: {entry.student_number}
              </div>
              <div>
                Student: {entry.last_name} {entry.first_name}
              </div>
            </div>
          </div>
          <div className={styles.Message_Detail}>
            <div>
              To: {entry.parent_username}
              <p>{entry.topic}</p>
              <p>{entry.notice_content}</p>
              <div className={styles.OptionContainer}>
                <div className={styles.ChoicesContainer}>
                  {entry.notice_choices.map((choice, index) => (
                    <div key={index} className={styles.Choice}>
                      <input
                        type="radio"
                        name={`notice_choice_${entry.notice_id}`}
                        value={choice}
                      />
                      <label>{choice}</label>
                    </div>
                  ))}
                </div>

                <div className={styles.ChoicesContentsContainer}>
                  {entry.notice_choice_contents.map((content, index) => (
                    <div key={index}>{content}</div>
                  ))}
                </div>

                <div className={styles.ChoicesPricesContainer}>
                  {entry.notice_choice_prices.map((price, index) => (
                    <div key={index}>${price}</div>
                  ))}
                </div>
                
              </div>
              <button>Submit</button>
            </div>
            <div className={styles.createdAt}>{entry.created_at}</div>
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
