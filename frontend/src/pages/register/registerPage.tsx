import { useState } from "react"
import styles from "./RegisterPage.module.css"

export function RegisterPage() {
    const[parentName, setParentName] = useState("");
    const[parentEmail, srtParentEmail] = useState("");
    const[phoneNumber, setPhoneNum] = useState("");


    return(
        <div className={styles.RegisterContainer}>
            <div>
                Container
            </div>
    
        </div>
    )
    

    
}