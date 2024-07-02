import * as React from "react";
import "./StudentProfileSmall.css";

type StudentProps = {
  studentName: string;
  image: string;
};

export default function StudentProfileSmall({
  studentName,
  image,
}: StudentProps) {
  return (
    <li>
      <div id="textstyle">{studentName}</div>
      <img src={image} alt="studnent image" />
      <div>last_name</div>
      <div>student_number</div>
      <div>grade class_name</div>
    </li>
  );
}
