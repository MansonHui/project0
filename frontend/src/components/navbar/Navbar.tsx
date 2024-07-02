import styles from "./Navbar.module.css";
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Outlet, useLocation, useNavigate } from 'react-router-dom' 
import React from "react";



export default function Navbar() {
  const navigate = useNavigate();
  

 

 
  return (
// ------------ Navbar Logo Container ------------
    <div className={styles.navbar_container}>
      <div className={styles.navbar_logo_container}></div>

{/* ------------ Navbar Function Container ------------ */}
      <div className={styles.navbar_function_container}>

        <div onClick={()=>navigate("HomePage")} className={styles.navbar_function}>
          <div className={styles.navbar_function_logo}><HomeSharpIcon color="action"/></div>
          <div className={styles.navbar_function_text}>Home</div>
        </div>
        <div onClick={()=>navigate("Message")}  className={styles.navbar_function}>
          <div className={styles.navbar_function_logo}><AnnouncementRoundedIcon color="action"/></div>
          <div className={styles.navbar_function_text}>Instant Messaging 即時通訊</div>
        </div>
        <div onClick={()=>navigate("Drawing")} className={styles.navbar_function}>
          <div className={styles.navbar_function_logo}><EmailRoundedIcon color="action"/></div>
          <div className={styles.navbar_function_text}>Drawing Notice</div>
        </div>
        <div onClick={()=>navigate("AI")} className={styles.navbar_function}>
          <div className={styles.navbar_function_logo}><StickyNote2RoundedIcon color="action"/></div>
          <div className={styles.navbar_function_text}>AI Attendances</div>
        </div>
        <div className={styles.navbar_function}>
          <div className={styles.navbar_function_logo}><StickyNote2RoundedIcon color="action"/></div>
          <div className={styles.navbar_function_text}>School Payment</div>
        </div>
        <div onClick={()=>navigate("Register")} className={styles.navbar_function}>
          <div className={styles.navbar_function_logo}><StickyNote2RoundedIcon color="action"/></div>
          <div className={styles.navbar_function_text}>Register</div>
        </div>
        <div onClick={()=>navigate("TeacherNotice")} className={styles.navbar_function}>
          <div className={styles.navbar_function_logo}><StickyNote2RoundedIcon color="action"/></div>
          <div className={styles.navbar_function_text}>TeacherNotice</div>
        </div>
        
      </div>
      
{/* ------------ Navbar Info Container ------------ */}
      <div onClick={()=>navigate("/")} className={styles.navbar_info_container}>
        <div>
          <ArrowBackIcon className={styles.navbar_info_GobackButton } 
          fontSize="large"
          color="action"
          type="button"
          
          /> 
          </div>

      </div>
  
    </div>
    
  );
  
}
