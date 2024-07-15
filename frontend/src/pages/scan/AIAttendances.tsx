import React, { useEffect, useState } from "react";
import WebcamCapture from "../../components/capture/WebCamCapture";
import ManualCapture from "../../components/capture/ManualCapture";
import "./CamCapture.css";

const AIAttendances: React.FC = () => {
  const value = localStorage.getItem("newStudentId");
  const [show, setShow] = useState(value ? "manual" : "auto");
  const [isRegister, setIsRegister] = useState(
    value ? "Profile Picture Capturing" : "Attendance Taking"
  );

  useEffect(() => {
    // const value = localStorage.getItem("newStudentId");
    if (value) {
      setShow("manual");
      setIsRegister("Profile Picture Capturing");
    }
    if (!value) {
      setShow("auto");
      setIsRegister("Attendance Taking");
    }
  }, [value]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="detection_mode">{isRegister}</h1>
        <h2 className="instruction">
          Move Your Head Toward The Camera Until The Frame Colour Change to
          Green
        </h2>

        {/* <button
          className={value ? "show-button" : "hide-button"}
          onClick={() => {
            setShow("manual");
          }}
        >
          Manual Profile Picture capture
        </button>
        <button
          className={value ? "hide-button" : "show-button"}
          onClick={() => setShow("auto")}
        >
          Auto Scan for Attendance
        </button> */}
        <section>
          {show === "manual" ? <ManualCapture /> : <WebcamCapture />}
        </section>
      </header>
    </div>
  );
};

export default AIAttendances;

// import TabButton from "../../components/TabButton.jsx/TabButton";
// import styles from "./AIAttendances.module.css";
// import { useState } from "react";

// export default function AIAttendances() {
//   const [selectedMode, setSelectedMode] = useState("Manual");

//   function handleManualCapture(selector: string) {
//     setSelectedMode(selector);
//     console.log(selectedMode);
//   }
//   return (
//     <div className={styles.ScanContainer}>
//       <h1> Scan your face @@ </h1>

//       <TabButton
//         isSelected={selectedMode === "Manual"}
//         OnManualCapture={() => handleManualCapture("Manual")}
//       >
//         Manual
//       </TabButton>
//       <TabButton
//         isSelected={selectedMode === "Auto"}
//         OnManualCapture={() => handleManualCapture("Auto")}
//       >
//         Auto
//       </TabButton>

//       <p>{selectedMode}</p>
//     </div>
//   );
// }
