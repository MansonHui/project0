import React from "react";
import { studentData } from "./studentData";
import StudentProfileSmall from "../../components/StudentProfileSmall.tsx/StudentProfileSmall";
import TabButton from "../../components/TabButton.jsx/TabButton";

export default function SuperAdminPage() {
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

        <menu></menu>
      </section>
      ;
    </>
  );
}
