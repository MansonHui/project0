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

function App() {
  const { authToken } = useAuth();
  return (
    <div>
      
      <Routes>
      
      <Route path="/" element={<Login />} />
      {/* <Route element={<LoginAuthGuard authToken={thToken} />}> */}
      
      
      <Route
          path="/*"
          element={
            <>
              <MenuHeaderBar />
              <Routes>
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/Message" element={<MessagePage />} />
                <Route path="/Notices" element={<NoticePage />} />
                <Route path="/Drawing" element={<DrawPage />} />
                <Route path="/AI" element={<AIAttendances />} />
              </Routes>
            </>
          }
        />


      {/* </Route> */}
    </Routes>

    </div>
    
  );
}

export default App;
