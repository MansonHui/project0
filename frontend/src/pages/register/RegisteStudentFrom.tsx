import { useState } from "react";
import styles from "./RegisterPage.module.css";

export default function RegisteStudentFrom() {
  const [email, setEmail] = useState("tsangmeimei@gmail.com");
  const [first_name, setFirst_name] = useState("ip");
  const [last_name, setLast_name] = useState("adams");
  const [HKID_number, setHKID_number] = useState("A1234");
  const [birthday, setBirthday] = useState("2020-01-01");
  const [gender, setGender] = useState("M");
  // const [parentId, setParentId] = useState("Alex");
  // const [schoolId, setSchoolId] = useState("st");

  const [showStudentInput, setShowStudentInput] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createStudent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            first_name: first_name,
            last_name: last_name,
            HKID_number: HKID_number,
            birthday: birthday,
            gender: gender,
            // parentId: parentId,
            // schoolId: schoolId,
          }),
        }
      );

      const reponse = await res.json();

      console.log("reponse", reponse);

      if (res.ok) {
        console.log("dataFromServer", reponse.newStudentDetail);
        localStorage.setItem(
          "newStudentId",
          JSON.stringify(reponse.newStudentDetail)
        );
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error registering Student:", error);
    }
  };

  const handleStudentCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowStudentInput(e.target.checked);
  };

  const registeStudent = (
    <div>
      <form onSubmit={handleSubmit}>
        {showStudentInput && (
          <div>
            student
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
              />
            </div>
            <div>
              <input
                type="first_name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                placeholder="first_name"
                required
              />
            </div>
            <div>
              <input
                type="last_name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                placeholder="last_name"
                required
              />
            </div>
            <div>
              <input
                type="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="gender"
                required
              />
            </div>
            <div>
              <input
                type="HKID_number"
                value={HKID_number}
                onChange={(e) => setHKID_number(e.target.value)}
                placeholder="HKID_number"
                required
              />
            </div>
            <div>
              <input
                type="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="birthday"
                required
              />
            </div>
            {/* <div>
              <input
                type="parentId"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                placeholder="parentId"
                required
              />
            </div>

            <div>
              <input
                type="schoolId"
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                placeholder="schoolId"
                required
              />
            </div> */}
            <button type="submit">Register</button>
          </div>
        )}
      </form>
    </div>
  );
  return (
    <div>
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
    </div>
  );
}
