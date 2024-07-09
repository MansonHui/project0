import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const RegisteStudentFrom = () => {
  const [email, setEmail] = useState("tsangmeimei@gmail.com");
  const [first_name, setFirst_name] = useState("ip");
  const [last_name, setLast_name] = useState("adams");
  const [HKID_number, setHKID_number] = useState("A1234");
  const [birthday, setBirthday] = useState("2020-01-01");
  const [gender, setGender] = useState("M");

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

  const registeStudent = (
    <div>
      <form onSubmit={handleSubmit} id={styles.RegisteStudentFrom}>
        <div id={styles.registeStudentIcon}></div>
        <div id={styles.registeStudentInfo}>
          <Box>
            <TextField
              className={styles.registeStudentInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
            />
          </Box>
          <Box>
            <TextField
              className={styles.registeStudentInput}
              type="first_name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              placeholder="first_name"
              required
            />
          </Box>
          <Box>
            <TextField
              className={styles.registeStudentInput}
              type="last_name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              placeholder="last_name"
              required
            />
          </Box>
          <Box>
            <TextField
              className={styles.registeStudentInput}
              type="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="gender"
              required
            />
          </Box>
          <Box>
            <TextField
              className={styles.registeStudentInput}
              type="HKID_number"
              value={HKID_number}
              onChange={(e) => setHKID_number(e.target.value)}
              placeholder="HKID_number"
              required
            />
          </Box>
          <Box>
            <TextField
              className={styles.registeStudentInput}
              type="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="birthday"
              required
            />
          </Box>
          <p />
          <Button type="submit" variant="contained" color="success">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
  return <div>{registeStudent}</div>;
};

export default RegisteStudentFrom;
