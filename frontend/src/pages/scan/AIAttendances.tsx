import React, { useState } from "react";
import WebcamCapture from "../../components/capture/WebCamCapture";

import ManualCapture from "../../components/capture/ManualCapture";
import "./CamCapture.css";

const AIAttendances: React.FC = () => {
  const [show, setShow] = useState("manual");
  return (
    <div className="App">
      <header className="App-header">
        <h1>Face Detection App</h1>
        <button onClick={() => setShow("manual")}>Manual</button>
        <button onClick={() => setShow("auto")}>Auto</button>
        {show === "manual" ? <ManualCapture /> : <WebcamCapture />}
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
