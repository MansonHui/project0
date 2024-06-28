import { FormEvent, useState } from "react";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showTeacherInput, setShowTeacherInput] = useState(false);
  const [showConfirmParentAC, setShowConfirmParentAC] = useState(false);
  const [showParentInput, setShowParentInput] = useState(false);
  const [showStudentInput, setShowStudentInput] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  const handleTeacherCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowTeacherInput(e.target.checked);
  };

  const handleConfirmParentACChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowConfirmParentAC(e.target.checked);
  };

  const handleParentCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowParentInput(e.target.checked);
  };

  const handleStudentCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowStudentInput(e.target.checked);
  };

  const registeTeacher = (
    <div>
      <div>
        {showTeacherInput && (
          <div>
            teacher
            <div>
              teacherName: <input />
            </div>
            <div>
              teacherEmail: <input />
            </div>
            <div>
              password: <input />
            </div>
            <div>
              confirm password: <input />
            </div>
            <button type="submit">Sumbit</button>
          </div>
        )}
      </div>
    </div>
  );

  const confirmParentAC = (
    <div>
      <div>
        {showConfirmParentAC && (
          <div>
            confirm
            <div>
            confirm parent Name: <input />
            </div>
            <div>
            confirm Email: <input />
            </div>
            <div>
              confirm phoneNumber: <input />
            </div>
            <button type="submit">confirm</button>
          </div>
        )}
      </div>
    </div>
  );

  const registeParent = (
    <div>
      <div>
        {showParentInput && (
          <div>
            parent
            <div>
              parentName: <input />
            </div>
            <div>
              parentEmail: <input />
            </div>
            <div>
              phoneNumber: <input />
            </div>
            <div>
              confirm phoneNumber: <input />
            </div>
            <button type="submit">Sumbit</button>
          </div>
        )}
      </div>
    </div>
  );

  const registeStudent = (
    <div>
      <div>
        {showStudentInput && (
          <div>
            student
            <div>img</div>
            <div>
              studentName: <input />
            </div>
            gender:{" "}
            <select name="gender">
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
            <div>
              student ID: <input />
            </div>
            <div>
              birthday: <input />
            </div>
            <div>
              class: <input />*
            </div>
            <div>
              teacher: <input />*
            </div>
            <button type="submit">Sumbit</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Register Teacher
          <input
            type="checkbox"
            checked={showTeacherInput}
            onChange={handleTeacherCheckboxChange}
          />
        </label>
      </div>
      {registeTeacher}

      <div>
        <label>
        If you already have an account
          <input
            type="checkbox"
            checked={showConfirmParentAC}
            onChange={handleConfirmParentACChange}
          />
        </label>
      </div>
      {confirmParentAC}

      <div>
        <label>
        Register Parent
          <input
            type="checkbox"
            checked={showParentInput}
            onChange={handleParentCheckboxChange}
          />
        </label>
      </div>
      {registeParent}

      <div>
        <label>
        Register Student
          <input
            type="checkbox"
            checked={showStudentInput}
            onChange={handleStudentCheckboxChange}
          />
        </label>
      </div>
      {registeStudent}
    </form>
  );
}
