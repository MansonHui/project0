import { useLocation, useNavigate } from "react-router-dom";
import { useGetTeacherNoticeDetail } from "../../api/teacherPageAPI";
import styles from "./TeacherNoticeDetailPage.module.css"
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";

export default function TeacherNoticeDetailPage(){
    let location = useLocation();
    const navigate = useNavigate();

    const allTeacherNoticeDetail = useGetTeacherNoticeDetail(location.state.notice_id)

    const queryClient = useQueryClient()

    
    return(
        <div>
            {allTeacherNoticeDetail.map((entry)=>(
              <div className={styles.MainContainer}>
                <div className={styles.TopContainer}>
                  <div className={styles.ClassContainer}>
                    <div>Class:{" "}{entry.grade}{entry.class_name}</div><div></div><div></div>
                  </div>
                  <div className={styles.TopicContainer}>
                    Topic:{" "}{entry.topic}<div></div><div></div><div></div>
                  </div>
                  <div className={styles.ContentContainer}>
                    Content:{" "}{entry.content}<div></div><div></div><div></div>
                    </div>
              </div>

            <div className={styles.TotalReplyContainer}>
              <div className={styles.RepliedContainer}>Replied:    {entry.notnull_count}
              <div></div><div></div>
              </div>
              <div className={styles.UnReplyContainer}>until no Reply:     {entry.null_count}
              <div></div><div></div>
              </div>
            </div>

            <div  className={styles.ReplyContainer}>

              <div className={styles.Replied}>
                {entry.student_ids_2.map((choiceId, index) => {
                  if (entry.notice_choice_id_2[index] != null) {
                    return(<div>
                      
                      ClassNum: {entry.student_numbers[index]}
                      Name:{entry.student_names[index]}
                      Choice:{entry.notice_choice_contents[index]}
                      </div>)
                  }else{
                    return(<></>)
                  }
                })}
              </div>

              <div className={styles.NotReplied}>
                {entry.student_ids_2.map((choiceId, index) => {
                  if (entry.notice_choice_id_2[index] === null) {
                    return(<div>
                      ClassNum: {entry.student_numbers[index]}
                      {" "}{" "}
                      Name:{entry.student_names[index]}
                      {" "}{" "}
                      Choice:{entry.notice_choice_contents[index]}Null
                      </div>)
                  }else{
                    return(<></>)
                  }
                })}

              </div>
              <Button variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
            </Button>

            </div>
            
            
          </div>
            ))}


            

          

            
        </div>
    )
}