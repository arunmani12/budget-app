import React, { useState } from 'react'
import styles from '../../styles/Auth.module.css'
import { useRouter } from 'next/router';
import { validateEmail } from "../../common";
import { toast } from 'react-toastify';

const Login = ({setModel,setLoading}:{
  setModel:React.Dispatch<React.SetStateAction<string>>,
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const loginHandler = async () => {
      setLoading(true)
        if (!(email.length > 5) || !(password.length > 5)) {
          if (!validateEmail(email)) { 
            toast.error('Please enter vaild email') 
            setLoading(false)
            return;
          }
          toast.error("character length is not enough");
          setLoading(false)
          return
        }
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
          setLoading(false)
          router.reload();
        } else {
          toast.error("email or password miss match");
          setLoading(false)
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