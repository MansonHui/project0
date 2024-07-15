import React from "react";
import { studentData } from "./studentData";
import StudentProfileSmall from "../../components/StudentProfileSmall.tsx/StudentProfileSmall";
import TabButton from "../../components/TabButton.jsx/TabButton";

export default function SuperAdminPage() {
  function handleManualCapture() {
    console.log("redirect to manual page capture");
  }
  <></>;
  return (
    <>
      <section>
        <header>students per class </header>
        {studentData.map((studentDataItem) => (
          <StudentProfileSmall {...studentDataItem} />
        ))}
      </section>
      <section id="classname">
        <header>classname </header>
        <TabButton isSelected={true} OnManualCapture={handleManualCapture}>
          children
        </TabButton>
        <menu></menu>
      </section>
      ;
    </>
  );
}
