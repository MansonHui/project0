import { useState } from "react";
import styles from "./RegisterPage.module.css";

// interface RegisteParentFromData {
//   email: string;
//   password: string;
// }

export default function RegisteParentFrom() {
  const [email, setEmail] = useState("tsangmeimei@gmail.com");
  const [password, setPassword] = useState("12345");

  const [showParentInput, setShowParentInput] = useState(false);

  const handleParentCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowParentInput(e.target.checked);
  };

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
            password: password,
          }),
        }
      );
    } catch (error) {
      console.error("Error registering Parent:", error);
    }
  };

  const registeParent = (
    <div>
      <form onSubmit={handleSubmit}>
        {showParentInput && (
          <div>
            parent

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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
            </div>
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
          Register Parent
          <input
            type="checkbox"
            checked={showParentInput}
            onChange={handleParentCheckboxChange}
          />
        </label>
      </div>
      {registeParent}
    </div>
  );
}
