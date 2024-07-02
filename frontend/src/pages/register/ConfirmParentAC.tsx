import { useState } from "react";
import styles from "./RegisterPage.module.css";

export default function ConfirmParentAC() {
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

  const confirmParentAC = (
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
  );
  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}
