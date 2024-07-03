import { useEffect, useState } from "react";
import styles from "./RegisterPage.module.css";

interface RegisteAdminFromData {
  email: string;
}

const RegisteAdminFrom: React.FC = () => {
  const [showAdminInput, setShowAdminInput] = useState(false);

  const [registeAdminFromData, setSegisteAdminFromData] =
    useState<RegisteAdminFromData>({
      email: "YYLam@stpeter.edu.hk",

    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createAdmin`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registeAdminFromData),
        }
      );
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
  };

  const handleAdminCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {

    setShowAdminInput(e.target.checked);
  };

  const registeTeacher = (
    <form onSubmit={handleSubmit}>
      {showAdminInput && (
        <div>
          teacher

          <div>
            <input
              type="email"
              value={registeAdminFromData.email}
              onChange={handleInputChange}
              placeholder="email"
              required
            />
          </div>
          <button type="submit">Register</button>
        </div>
      )}
    </form>
  );

  return (
    <div>
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
    </div>
  );
};

export default RegisteAdminFrom;
