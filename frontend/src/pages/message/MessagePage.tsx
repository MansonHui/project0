import { Button } from "@mui/material";
import styles from "./MessagePage.module.css";
import { useGetallNotice } from "../../api/noticePageAPI";
import { Outlet, useNavigate } from "react-router-dom";
import NoticePage from "../notice/NoticePage";
import AttendancePage from "../attendance/AttendancePage";
import { useGetallAttendance } from "../../api/attendancePageAPI";
import { useState } from "react";

export default function MessagePage() {
    const navigate = useNavigate();
    const allNotice = useGetallNotice();
    const allAttendance = useGetallAttendance();
    

  return (
    <div>
        <div className={styles.Container}>
            <div className={styles.Filter_Container}>
                <Button variant="outlined">All</Button>
                <Button onClick={()=>navigate("/Message/Notices")} variant="outlined">Notice</Button>
                <Button onClick={()=>navigate("/Message/Attendance")} variant="outlined">Attendances</Button>
            </div>

            
                <div className={styles.Message_Container}>
                <Outlet />
                </div>
                
        </div>
    </div>
  );
}
