import { useState } from "react";
import styles from "./RegisterPage.module.css";

export default function RegisteStudentFrom() {
  const [showStudentInput, setShowStudentInput] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createParent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //   username: parentName,
          //   email: parentEmail,
          //   password: phoneNumber,
        }),
      }
    );
  };

  const handleStudentCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowStudentInput(e.target.checked);
  };

  const registeStudent = (
    <div>
      {showStudentInput && (
        <div>
          student
          <div>img</div>
          <div>
            studentFirstName: <input />
          </div>
          <div>
            studentLastName: <input />
          </div>
          gender:{""}
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
            : <input />
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
  );
  return (
    <form onSubmit={handleSubmit}>
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
