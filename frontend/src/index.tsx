import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/home/HomePage";
import MessagePage from "./pages/notice/MessagePage";
import DrawPage from "./pages/drawNotice/DrawPage";
import AIAttendances from "./pages/scan/AIAttendances";
import MenuHeaderBar from "./components/header/Header";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


export const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

      <MenuHeaderBar />
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="Message" element={<MessagePage/>}/>
            <Route path="Drawing" element={<DrawPage/>}/>
            <Route path="AI" element={<AIAttendances/>}/>
          </Routes>

      </BrowserRouter>
    </QueryClientProvider>
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
