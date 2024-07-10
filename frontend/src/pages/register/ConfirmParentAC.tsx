import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Button from "@mui/material/Button";

export default function ConfirmParentAC() {
  const [email, setEmail] = useState("tsangmeimei@gmail.com");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createParent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
    } catch (error) {
      console.error("Error registering Parent:", error);
    }
  };

  const confirmParentAC = (
    <div>
      <form onSubmit={handleSubmit}>
        <div id={styles.confirmParentACFrom}>
          <input
            id={styles.confirmParentACInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
          <Button
            id={styles.confirmParentACButton}
            type="submit"
            variant="contained"
            color="success"
          >
            Confiem
          </Button>
        </div>
      </form>
    </div>
  );
  return <div>{confirmParentAC}</div>;
}
