import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginAuthGuard } from "./pages/login/loginAuthGuard";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/login/loginPage";
import HomePage from "./pages/home/HomePage";
import DrawPage from "./pages/drawNotice/DrawPage";
import AIAttendances from "./pages/scan/AIAttendances";
import MessagePage from "./pages/message/MessagePage";
import NoticePage from "./pages/notice/NoticePage";
import AttendancePage from "./pages/attendance/AttendancePage";

import MessageAllPage from "./pages/messageAll/MessageAllPage";
import ParentPage from "./pages/parent/ParentPage";
import Textarea from "./components/textarea/Textarea";
import TeacherNoticePage from "./pages/teacherNotice/TeacherNoticePage";


// import RegisterPage from "./pages/register/RegisterPage";
import SuperAdminPage from "./pages/superAdmin/superAdminPage";
import NoticeDetailPage from "./pages/noticeDetail/NoticeDetailPage";
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
        {/* <Route path="/HomePage" element={<ParentPage />} /> */}
        <Route path="/Message" element={<MessagePage />}>
          <Route path="/Message" element={<MessageAllPage />} />
          <Route path="MessageAll" element={<MessageAllPage />}>
            {" "}
          </Route>
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

        <Route path="/Drawing" element={<DrawPage />}>
          <Route path="Textarea" element={<Textarea />}></Route>
        </Route>
        <Route path="/AI" element={<AIAttendances />} />
        {/* <Route path="/Register" element={<RegisterPage />} /> */}

        <Route path="TeacherNotice" element={<TeacherNoticePage />}></Route>
        <Route path="/superAdmin" element={<SuperAdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
