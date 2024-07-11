import { useNavigate } from "react-router-dom";
import { useGetAllClass } from "../../api/homePageAPI";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();
  const allClass = useGetAllClass();

  console.log("render HOme", allClass);
  return (
    <div id={styles.homePage}>
      {allClass.map((entry) => (
        <div
          // onClick={() => navigate("../Message")}
          className={styles.School_Container}
          key={entry.student_id}
        >
          <div className={styles.UserSchool_Container}>
            <div className={styles.UserSchool_Logo}>
              <div className={styles.UserSchool_Name}>
                <p id={styles.schoolTitle}>School:</p>
                <p id={styles.schoolName}> {entry.full_name}</p>
              </div>
            </div>
            <div className={styles.UserSchool_Info}></div>
          </div>
          <div className={styles.UserChild_Container}>
            <div className={styles.UserChild_photo}>
              {/* {entry.image} */}
              </div>
            <div className={styles.UserChild_Info}>
              <div className={styles.UserChild_Information}>
                Teacher: {entry.admin_name}
              </div>
              <div className={styles.UserChild_Information}>
                Student: {entry.last_name}
                {entry.first_name}
              </div>
              <div className={styles.UserChild_Information}>
                Year: {entry.school_year}
              </div>
              <div className={styles.UserChild_Information}>
                Class: {entry.grade}
                {entry.class_name}
              </div>
              <div className={styles.UserChild_Information}>
                Parent: {entry.username}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
