import RegisteAdminFrom from "./RegisteAdminFrom";
import RegisteParentFrom from "./RegisteParentFrom";
import RegisteStudentFrom from "./RegisteStudentFrom";
import ConfirmParentAC from "./ConfirmParentAC";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const res = await fetch(
    //   `${process.env.REACT_APP_API_ENDPOINT}/superadmin/createParent`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //     }),
    //   }
    // );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {" "}
        <RegisteAdminFrom />
      </label>

      <label>
        {" "}
        <ConfirmParentAC />
      </label>

      <label>
        {" "}
        <RegisteParentFrom />
      </label>

      <label>
        {" "}
        <RegisteStudentFrom />
      </label>
    </form>
  );
}
