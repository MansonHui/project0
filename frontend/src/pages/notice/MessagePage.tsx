
import { Button } from "@mui/material"
import styles from "./MessagePage.module.css"

export default function MessagePage (){

    return (
        <div>
            <div className={styles.Container}>

                <div className={styles.Filter_Container}>
                <Button variant="outlined">All</Button>
                <Button variant="outlined">Message</Button>
                <Button variant="outlined">Notice</Button>
                <Button variant="outlined">Attendances</Button>
                </div>


                <div className={styles.Message_Container}>

                    <div className={styles.Message}>
                        <div className={styles.Message_type}>
                            <div>School Message</div>
                        </div>
                        <div className={styles.Message_Detail}>
                            <p>Red Rainstorm Signal</p>
                            <p>Created_at: Today</p>
                        </div>
                    </div>
                    <div className={styles.Message}>
                        <div className={styles.Message_type}>
                            <div>Notice</div>
                        </div>
                        <div className={styles.Message_Detail}>
                            <p>Buy a book</p>
                            <p>Created_at: Today</p>
                        </div>
                    </div>

                    <div className={styles.Message}>
                        <div className={styles.Message_type}>
                            <div>Attendances</div>
                        </div>
                        <div className={styles.Message_Detail}>
                            <p>Student Leaves School</p>
                            <p>Created_at: Today</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}