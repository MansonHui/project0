import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/loginPage";
import { LoginAuthGuard } from "./pages/login/loginAuthGuard";
import HomePage from "./pages/home/HomePage";
import DrawPage from "./pages/drawNotice/DrawPage";
import AIAttendances from "./pages/scan/AIAttendances";
import { useAuth } from "./hooks/useAuth";
import MessagePage from "./pages/message/MessagePage";
import { useQuery } from "@tanstack/react-query";
import MenuHeaderBar from "./components/header/Header";

import NoticePage from "./pages/notice/NoticePage";
import AttendancePage from "./pages/attendance/AttendancePage";

function App() {
  const { authToken } = useAuth();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route element={<LoginAuthGuard authToken={thToken} />}> */}

        <Route element={<MenuHeaderBar />}>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Message" element={<MessagePage />} >
            <Route path="Notices" element={<NoticePage />} />
            <Route path="Attendance" element={<AttendancePage/>} />
          </Route>
          
          <Route path="/Drawing" element={<DrawPage />} />
          <Route path="/AI" element={<AIAttendances />} />
        </Route>

        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
