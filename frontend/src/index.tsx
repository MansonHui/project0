import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MessagePage from "./pages/message/MessagePage";
import DrawPage from "./pages/drawNotice/DrawPage";
import AIAttendances from "./pages/scan/AIAttendances";
import MenuHeaderBar from "./components/header/Header";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import Login from "./pages/login/Login";

export const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// if login done can use this(line 21~48)

// const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/Login" element={<Login />} />
//         <Route
//           path="/HomePage"
//           element={isLoggedIn ? <HomePage /> : <Navigate to="/Login" />}
//         />
//         <Route
//           path="/Message"
//           element={isLoggedIn ? <MessagePage /> : <Navigate to="/Login" />}
//         />
//         <Route
//           path="/Drawing"
//           element={isLoggedIn ? <DrawPage /> : <Navigate to="/Login" />}
//         />
//         <Route
//           path="/AI"
//           element={isLoggedIn ? <AIAttendances /> : <Navigate to="/Login" />}
//         />
//         {isLoggedIn && <MenuHeaderBar />}
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MenuHeaderBar/>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route
          path="/HomePage"
          element={<HomePage />}
        />
        <Route path="/Message" element={<MessagePage />} />
        <Route
          path="/Drawing"
          element={<DrawPage />}
        />
        <Route
          path="/AI"
          element={<AIAttendances/>}
        />
        {/* {isLoggedIn && <MenuHeaderBar />} */}
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
