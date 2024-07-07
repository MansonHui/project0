import { useNavigate } from "react-router-dom";



export default function TeacherNoticeDetailPage(){
    const navigate = useNavigate();
    return(
        <div>
            

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