import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

const RegisteStudentFrom = () => {
  const [email, setEmail] = useState("tsangmeimei@gmail.com");
  const [first_name, setFirst_name] = useState("adams");
  const [last_name, setLast_name] = useState("ip");
  const [HKID_number, setHKID_number] = useState("A1234");
  const [birthday, setBirthday] = useState("2020-01-01");
  const [gender, setGender] = useState("M");
  const [grade, setGrade] = useState("1");
  const [className, setClassName] = useState("A");

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
            grade: grade,
            className: className,
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

  const navigate = useNavigate();
  const handleNavigation = () => {
    let value = localStorage.getItem("newStudentId");
    if (value) {
      // Call function A
      navigate("/AI");
    } else {
      // Call function B
      alert("please complete the student registration first  ");
    }
  };

  const registeStudent = (
    <div>
      <form onSubmit={handleSubmit} id={styles.RegisteStudentFrom}>
        <div id={styles.registeStudentIconAndButton}>
          <div id={styles.registeStudentIcon}></div>
          <Button
            id={styles.registeStudentButton}
            type="submit"
            variant="contained"
            color="success"
          >
            Register
          </Button>

          <Button
            onClick={handleNavigation}
            variant="contained"
            color="success"
          >
            Take profile picture
          </Button>
        </div>

        <div id={styles.registeStudentInfo}>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="first_name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              placeholder="first_name"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="last_name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              placeholder="last_name"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="gender"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="HKID_number"
              value={HKID_number}
              onChange={(e) => setHKID_number(e.target.value)}
              placeholder="HKID_number"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="birthday"
              required
            />
          </Box>
          <Box>
            <input
              className={styles.registeStudentInput}
              type="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="grade"
              required
            />
          </Box>

          <Box>
            <input
              className={styles.registeStudentInput}
              type="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="className"
              required
            />
          </Box>

          <p />
        </div>
      </form>
    </div>
  );
  return <div>{registeStudent}</div>;
};

export default RegisteStudentFrom;
