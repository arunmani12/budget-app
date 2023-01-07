import React, { useState } from 'react'
import styles from '../../styles/Auth.module.css'
import { useRouter } from 'next/router';
import { validateEmail } from "../../common";

const Login = ({setModel}:{setModel:React.Dispatch<React.SetStateAction<string>>}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const loginHandler = async () => {
        if (!(email.length > 0) || !(password.length > 4)) {
          if (!validateEmail(email)) {
            // toast("Please enter vaild email");  
            alert('Please enter vaild email') 
            return;
          }
          alert("Register number or dob must not empty");
          return
        }
        // setLoading(true)
        const res = await fetch(`/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        let response = await res.json();


        if (response.message == "Success!") {
        //   setLoading(false)
          router.reload();
        } else {
        //   setLoading(false)
          alert("email or dob miss match");
        }
      };


    return (
        <div className={styles.authCard}>
            <h1>Login</h1>
            <form>
                <div className={styles.InputHolder}>
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>

                <div className={styles.InputHolder}>
                    <label htmlFor='passworrd'>Password</label>
                    <input type='password' name='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button type='button' onClick={loginHandler}>Login</button>
                <p className={styles.info}>Don't have an account? <span onClick={() => setModel('register')}>register</span></p>
            </form>
        </div>
    )
}

export default Login