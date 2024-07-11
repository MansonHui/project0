import { useNavigate } from "react-router-dom";
import { useGetStudentData } from "../../api/ParentPageAPI";
import styles from "./Parent.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ParentPage() {
  const navigate = useNavigate();
  const studentData = useGetStudentData();

  return (
    <div>
      {studentData &&
        studentData.map((entry, index) => (
          <div
            key={index}
            onClick={() => navigate("../Message")}
            className={styles.School_Container}
          >
            <div className={styles.UserSchool_Container}>
              <div className={styles.UserSchool_Logo}></div>
              <div className={styles.UserSchool_Name}>
                <p>{entry.full_name}</p>
              </div>
              <div className={styles.UserSchool_Info}>
                <MoreVertIcon fontSize="large" />
              </div>
            </div>
            <div className={styles.UserChild_Container}>
              <div className={styles.UserChild_photo}>{entry.image}</div>
              <div className={styles.UserChild_Info}>
                <div className={styles.UserChild_Information}>
                  {entry.admin_name}
                </div>
                <div className={styles.UserChild_Information}>
                  {entry.last_name}
                  {entry.first_name}
                </div>
                <div className={styles.UserChild_Information}>
                  {entry.student_number}
                </div>
                <div className={styles.UserChild_Information}>
                  {entry.grade}
                </div>
                <div className={styles.UserChild_Information}>
                  {entry.class_name}
                </div>
                <div className={styles.UserChild_Information}></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
