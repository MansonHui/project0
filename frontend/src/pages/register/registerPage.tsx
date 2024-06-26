import { useState } from "react"
import styles from "./RegisterPage.module.css"

export default function RegisterPage() {
    const[parentName, setParentName] = useState("");
    const[parentEmail, setParentEmail] = useState("");
    const[phoneNumber, setPhoneNum] = useState("");

    console.log("registerPage")

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         // email: email,
    //         // password: password,(after DB ok unloker)
    //       }),
    //     });
    //     const reponse = await res.json();
    
    //     if (res.ok) {
    //       login(reponse.token)
    //     }else{
    //       alert("Login failed")
    //     }
    
    //   };

    // const RegisterFrom = (
    //     <form onSubmit={handleSubmit} id={styles.loginCore}>
    //       <div id={styles.registerInputBar}>
    //         <div id={styles.welcome}>Welcome</div>
    //         <div id={styles.email}>
    //           <input
    //             type="parentName"
    //             value={parentName}
    //             onChange={(e) => setParentName(e.target.value)}
    //             placeholder="email"
    //             required
    //           />
    //         </div>
    //         <div id={styles.email}>
    //           <input
    //             type="email"
    //             value={parentEmail}
    //             onChange={(e) => setParentEmail(e.target.value)}
    //             placeholder="email"
    //             required
    //           />
    //         </div>
    //         <div id={styles.password}>
    //           <input
    //             type="password"
    //             value={phoneNumber}
    //             onChange={(e) => setPhoneNum(e.target.value)}
    //             placeholder="password"
    //             required
    //           />
    //         </div>
    //       </div>
    //       <input type="submit" value="Register" />
    //     </form>
        
    //   );

    return(
     <RegisterPage />
    );
}