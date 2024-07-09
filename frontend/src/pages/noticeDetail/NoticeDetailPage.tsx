import React from "react";
import {
  selectChoice,
  useGetNoticeDetail,
} from "../../api/noticeDetailPageAPI";
import styles from "./NoticeDetailPage.module.css";
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export default function NoticeDetailPage() {
  const navigate = useNavigate();
  let location = useLocation();
  console.log("location", location);

  const NoticeDetail = useGetNoticeDetail(
    location.state.notice_id,
    location.state.student_id
  );

  const queryClient = useQueryClient()

  const [choice, setChoice] = useState("");

  const onSelectChoice = useMutation({
    mutationFn: async (data: {
      noticeIdNumber: number;
      studentIdNumber: number;
      noticeChoiceId: string;
    }) =>
      selectChoice(
        data.noticeIdNumber,
        data.studentIdNumber,
        data.noticeChoiceId
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["allNoticeDetail"] }),
  });

  // let [isHide, setIsHide] = React.useState(false);
  // let [isSelect, setIsSelect] = React.useState(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(null);

  // const handleClick = () => {
  //   setIsHide(true);
  // };
  // const handleRadioChange = (choiceId: number) => {
  // setSelectedChoiceId(choiceId);
  // setIsHide(false);
  // };

  const handleSubmit = (e: any) => {
    // console.log("selected what", selectedChoiceId);
    // e.preventDefault()
    console.log(
      "check handle!! notice_id:",
      location.state.notice_id,
      " student_id:",
      location.state.student_id,
      " choice:",
      choice
    );

    onSelectChoice.mutate({
      noticeIdNumber: location.state.notice_id,
      studentIdNumber: location.state.student_id,
      noticeChoiceId: choice,
    });
  };

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
                  {entry.notice_choice_ids.map((choiceId, index) => {
                    if (entry.notice_choice_id === null) {
                      return (
                        <div key={index} className={styles.Choice}>
                          <input
                            // value={choice}
                            type="radio"
                            name={`notice_choice_${entry.notice_id}`}
                            value={choiceId}
                            onChange={(e) => {
                              console.log("clicked", e.target.value);
                              setChoice(e.target.value);
                            }}
                          />
                          <label>{entry.notice_choices[index]}</label>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className={styles.Choice}>
                          <input
                            type="radio"
                            name={`notice_choice_${entry.notice_id}`}
                            value={choiceId}
                            checked={
                              entry.notice_choice_id.toString() == choiceId
                                ? true
                                : false
                            }
                            disabled={false}
                          />
                          <label>{entry.notice_choices[index]}</label>
                        </div>
                      );
                    }
                  })}

                  {/* {entry.notice_choice_ids.map((choiceId, index) => (
                    <div key={index} className={styles.Choice}>
                      <input
                        type="radio"
                        name={`notice_choice_${entry.notice_id}`}
                        value={choiceId}
                        checked={
                          entry.notice_choice_id.toString() == choiceId
                            ? true
                            : false
                        }
                      />
                      <label>{entry.notice_choices[index]} </label>
                    </div>
                  ))} */}
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
              {entry.notice_choice_id == null ? (
                <button onClick={handleSubmit}>Submit</button>
              ):<></>}
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
