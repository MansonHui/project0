import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/loginPage";
import { LoginAuthGuard } from "./pages/login/loginAuthGuard";
import HomePage from "./pages/home/HomePage";
import DrawPage from "./pages/drawNotice/DrawPage";
import AIAttendances from "./pages/scan/AIAttendances";
import { useAuth } from "./hooks/useAuth";
import MessagePage from "./pages/message/MessagePage";

import NoticePage from "./pages/notice/NoticePage";
import AttendancePage from "./pages/attendance/AttendancePage";
import { useEffect } from "react";

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
        <Route path="/Message" element={<MessagePage />}>
          <Route path="Notices" element={<NoticePage />} />
          <Route path="Attendance" element={<AttendancePage />} />
        </Route>
        <Route path="/Drawing" element={<DrawPage />} />
        <Route path="/AI" element={<AIAttendances />} />
      </Route>
    </Routes>
  );
}

export default App;
