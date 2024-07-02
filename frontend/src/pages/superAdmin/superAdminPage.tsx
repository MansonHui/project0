import React from "react";
import { studentData } from "./studentData";
import StudentProfileSmall from "../../components/StudentProfileSmall.tsx/StudentProfileSmall";
import TabButton from "../../components/TabButton.jsx/TabButton";

export default function SuperAdminPage() {
  console.log("asdaa");
  <></>;
  return (
    <>
      <section>
        <header>students per class </header>
        <StudentProfileSmall {...studentData[0]} />
        <StudentProfileSmall {...studentData[1]} />
      </section>
      <section id="classname">
        <header>classname </header>
        <TabButton>1A</TabButton>
        <TabButton>2B</TabButton>
        <TabButton>3C</TabButton>
        <TabButton>4D</TabButton>

        <menu></menu>
      </section>
      ;
    </>
  );
}
