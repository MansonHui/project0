import { useNavigate } from "react-router-dom";
import { useGetTeacherNoticeDetail } from "../../api/teacherPageAPI";



export default function TeacherNoticeDetailPage(){
    const allTeacherNoticeDetail = useGetTeacherNoticeDetail()
    const navigate = useNavigate();
    return(
        <div>
            
          {allTeacherNoticeDetail.map((entry)=>(
            <div></div>

          ))}
            <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>
        </div>
    )
}