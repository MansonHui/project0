import { useState } from "react";
import styles from "./RegisterPage.module.css";

export default function ConfirmParentAC() {
  const [email, setEmail] = useState("tsangmeimei@gmail.com");
  const [showConfirmParentAC, setShowConfirmParentAC] = useState(false);

  const handleConfirmParentACChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowConfirmParentAC(e.target.checked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(
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
  };

  const confirmParentAC = (
    <div>
      <form onSubmit={handleSubmit}>
        {showConfirmParentAC && (
          <div>
            confirm
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
              />
            </div>
            <button type="submit">confirm</button>
          </div>
        )}
      </form>
    </div>
  );
  return (
    <div>
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
    </div>
  );
}
