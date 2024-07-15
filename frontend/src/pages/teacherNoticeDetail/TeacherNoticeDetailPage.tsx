import { useLocation, useNavigate } from "react-router-dom";
import { useGetTeacherNoticeDetail } from "../../api/teacherPageAPI";
import styles from "./TeacherNoticeDetailPage.module.css";
import { useState } from "react";

export default function TeacherNoticeDetailPage() {
  let location = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showRepliedNameList, setShowRepliedNameList] = useState(false);
  const [showReplyYetNameList, setShowReplyYetNameList] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const toggleRepliedNameList = () => {
    setShowRepliedNameList(!showRepliedNameList);
  };

  const toggleReplyYetNameList = () => {
    setShowReplyYetNameList(!showReplyYetNameList);
  };

  const allTeacherNoticeDetail = useGetTeacherNoticeDetail(
    location.state.notice_id
  );

  return (
    <div id={styles.teacherNoticeDetailPage}>
      {allTeacherNoticeDetail.map((entry) => (
        <div className={styles.MainContainer}>
          <div className={styles.ClassContainer}>
            <div>Class:</div>
            <div>
              {entry.grade}
              {entry.class_name}
            </div>
          </div>
          <div className={styles.TopicContainer}>
            <div id={styles.topicArea}>
              <div>Topic:</div>
              <div id={styles.topicContect}> {entry.topic}</div>
              <button id={styles.showContentButton} onClick={toggleContent}>
                {showContent ? "hidden" : "Content"}
              </button>
              <div
                className={`${styles.popuptext} ${
                  showContent ? styles.show : ""
                }`}
              >
                <p>{entry.content}</p>
              </div>
            </div>
          </div>
          <div id={styles.replyArea}>
            <button
              className={styles.RepliedContainer}
              id={styles.replied}
              onClick={toggleRepliedNameList}
            >
              {showRepliedNameList}
              <div className={styles.charmtickdouble}></div>Replied:{" "}
              {entry.notnull_count}
            </button>
            <div
              className={`${styles.replyPopupText} ${
                showRepliedNameList ? styles.show : ""
              }`}
            >
              {
                <div className={styles.Replied}>
                  {entry.student_ids_2.map((choiceId, index) => {
                    if (entry.notice_choice_id_2[index] !== null) {
                      return (
                        <div key={index}>
                          <div>ClassNo.: {entry.student_numbers[index]}</div>
                          <div>Name: {entry.student_names[index]}</div>
                          <div>
                            Choice: {entry.notice_choice_contents[index]}
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              }
            </div>

            <button
              className={styles.UnReplyContainer}
              id={styles.replyYet}
              onClick={toggleReplyYetNameList}
            >
              {showReplyYetNameList}
              <div className={styles.makiCross}></div>Reply Yet:{" "}
              {entry.null_count}
            </button>

            <div
              className={`${styles.replyYetPopupText} ${
                showReplyYetNameList ? styles.show : ""
              }`}
            >
              {
                <div className={styles.NotReplied}>
                  {entry.student_ids_2.map((choiceId, index) => {
                    if (entry.notice_choice_id_2[index] === null) {
                      return (
                        <div>
                          <div className={styles.textContainer}>
                            <div>ClassNo.: {entry.student_numbers[index]}</div>
                            <div>Name:{entry.student_names[index]}</div>
                            <div>
                              Choice:{entry.notice_choice_contents[index]}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
