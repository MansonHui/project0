import { useState } from "react";
import styles from "./RegisterPage.module.css";

export default function RegisteParentFrom() {
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showParentInput, setShowParentInput] = useState(false);

  

  const handleParentCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setShowParentInput(e.target.checked);
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
          username: parentName,
          email: parentEmail,
          password: phoneNumber,
        }),
      }
    );
  };

  

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

  return (
    <form onSubmit={handleSubmit}>

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
    </form>
  );
}
