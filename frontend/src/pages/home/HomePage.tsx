import styles from "./HomePage.module.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function HomePage() {
    

    return (
        <div>
            <div className={styles.School_Container}>
                <div className={styles.UserSchool_Container}>
                    <div className={styles.UserSchool_Logo}></div>
                    <div className={styles.UserSchool_Name}>
                        <p>School Name</p>
                    </div>
                    <div className={styles.UserSchool_Info}><MoreVertIcon fontSize="large"/></div>
                </div>
                <div className={styles.UserChild_Container}>
                    <div className={styles.UserChild_photo}></div>
                    <div className={styles.UserChild_Info}>
                        <div className={styles.UserChild_Information}>School</div>
                        <div className={styles.UserChild_Information}>Teacher</div>
                        <div className={styles.UserChild_Information}>Child_Name</div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}