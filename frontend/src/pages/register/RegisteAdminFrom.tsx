import { useState } from "react";
import styles from "./RegisterPage.module.css";

export default function RegisteAdminFrom() {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createAdmin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: adminName,
          admin_email: adminEmail,
          password: password,
        }),
      }
    );
  };

  const handleAdminCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowAdminInput(e.target.checked);
  };

  const registeTeacher = (
    <div>
      <div>
        {showAdminInput && (
          <div>
            teacher
            <div>
              <input
                type="Name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="email"
                required
              />
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Register Teacher
          <input
            type="checkbox"
            checked={showAdminInput}
            onChange={handleAdminCheckboxChange}
          />
        </label>
      </div>
      {registeTeacher}
    </form>
  );
}
