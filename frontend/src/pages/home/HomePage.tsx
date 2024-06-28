import { useNavigate } from "react-router-dom";
import { useGetAllClass } from "../../api/homePageAPI";
import styles from "./HomePage.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function HomePage() {
  const navigate = useNavigate();
  const allClass = useGetAllClass();

  console.log("render HOme",allClass);
  return (
    <>
      {allClass.map((entry) => (
        <div
          onClick={() => navigate("../Message")}
          className={styles.School_Container}
          key={entry.student_id}
        >
          <div className={styles.UserSchool_Container}>
            <div className={styles.UserSchool_Logo}></div>
            <div className={styles.UserSchool_Name}>
              <p>School: {entry.school_name}</p>
            </div>
            <div className={styles.UserSchool_Info}>
              <MoreVertIcon fontSize="large" />
            </div>
          </div>
          <div className={styles.UserChild_Container}>
            <div className={styles.UserChild_photo}>{entry.student_image}</div>
            <div className={styles.UserChild_Info}>
              <div className={styles.UserChild_Information}>
                Teacher: {entry.admin_username}
              </div>
              <div className={styles.UserChild_Information}>
                Student: {entry.student_last_name}
                {entry.student_first_name}
              </div>
              <div className={styles.UserChild_Information}>
                Year: {entry.school_year}
              </div>
              <div className={styles.UserChild_Information}>
                Class: {entry.grade}
                {entry.class_name}
              </div>
              <div className={styles.UserChild_Information}>
                Parent: {entry.parent_username}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
