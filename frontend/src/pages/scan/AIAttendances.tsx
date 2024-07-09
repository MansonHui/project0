import React, { useState } from "react";
import WebcamCapture from "../../components/capture/WebCamCapture";

import ManualCapture from "../../components/capture/ManualCapture";
import "./CamCapture.css";

const AIAttendances: React.FC = () => {
  const [show, setShow] = useState("manual");

  const value = localStorage.getItem("newStudentId");

  return (
    <div className="App">
      <header className="App-header">
        <div className="header_container">
          <h1 className="Face_Detection">Face Detection</h1>
        </div>

        <div className="scan_container">
          {show === "manual" ? <ManualCapture /> : <WebcamCapture />}
        </div>

        <div className="control_msg_container">control_msg_container</div>

        <div className="button_container">
          <button
            disabled={value ? false : true}
            className="Take_Profile_Picture"
            onClick={() => setShow("manual")}
          >
            Manual Profile Picture capture
          </button>
          <button className="Take_Attendance" onClick={() => setShow("auto")}>
            Auto Scan for Attendance
          </button>
        </div>
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
