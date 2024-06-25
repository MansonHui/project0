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

function App() {
  const { authToken } = useAuth();
  return (
    <div>
      <Routes>
      
      <Route path="/" element={<Login />} />
      {/* <Route element={<LoginAuthGuard authToken={thToken} />}> */}
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Message" element={<MessagePage />} />
        <Route path="/Drawing" element={<DrawPage />} />
        <Route path="/AI" element={<AIAttendances />} />
      {/* </Route> */}
    </Routes>
    </div>
    
  );
}

export default App;
