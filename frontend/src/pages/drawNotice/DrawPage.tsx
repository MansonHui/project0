import { IconButton } from "@mui/material";
import styles from "./DrawPage.module.css"
import CreateIcon from '@mui/icons-material/Create';

export default function Drawpage (){

    return(
        <div className={styles.Container}>
            <IconButton className={styles.CreateButton}>
                    <CreateIcon />
            </IconButton>
        </div>
    )
}