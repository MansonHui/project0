import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginAuthGuard } from "./pages/login/loginAuthGuard";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/login/loginPage";
import HomePage from "./pages/home/HomePage";
import AIAttendances from "./pages/scan/AIAttendances";
import MessagePage from "./pages/message/MessagePage";
import NoticePage from "./pages/notice/NoticePage";
import AttendancePage from "./pages/attendance/AttendancePage";
import TeacherNoticePage from "./pages/teacherNotice/TeacherNoticePage";
import RegisterPage from "./pages/register/RegisterPage";
import SuperAdminPage from "./pages/superAdmin/superAdminPage";
import NoticeDetailPage from "./pages/noticeDetail/NoticeDetailPage";
import EditNoticePage from "./pages/editlNotice/EditNoticePage";
import TeacherNoticeDetailPage from "./pages/teacherNoticeDetail/TeacherNoticeDetailPage";
import TeacherStudentAttendancePage from "./pages/teacherStudentAttendance/TeacherStudentAttendancePage";
import TopUpBalancePage from "./pages/topUpBalance/TopUpBalancePage";
import WebcamCapture from "./components/capture/ManualCapture";

function App() {
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) navigate("/HomePage");
    else navigate("/");
  }, [authToken]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<LoginAuthGuard authToken={authToken} />}>
        <Route path="/HomePage" element={<HomePage />} />
        //comments from Manson: this Messgae Path is not in used. Please delete
        if no further use.
        <Route path="/Message" element={<MessagePage />}>
          <Route path="/Message" element={<NoticePage />} />
          {/* <Route path="MessageAll" element={<MessageAllPage />}>
            {" "}
          </Route> */}
          <Route path="Notices" element={<NoticePage />}>
            {" "}
          </Route>
          <Route path="NoticeDetail" element={<NoticeDetailPage />}>
            {" "}
          </Route>
          <Route path="Attendance" element={<AttendancePage />}>
            {" "}
          </Route>
        </Route>
        <Route path="/EditNotice" element={<EditNoticePage />} />
        <Route path="/AI" element={<AIAttendances />} />
        <Route path="/ManualCapture" element={<WebcamCapture />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/TeacherNotice" element={<TeacherNoticePage />} />
        <Route
          path="TeacherNoticeDetail"
          element={<TeacherNoticeDetailPage />}
        />
        <Route
          path="/TeacherStudentAttendance"
          element={<TeacherStudentAttendancePage />}
        />
        <Route path="/superAdmin" element={<SuperAdminPage />} />
        <Route path="/ParentTopUpBalance" element={<TopUpBalancePage />} />
      </Route>
    </Routes>
  );
}

export default App;
