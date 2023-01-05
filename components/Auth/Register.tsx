import React, { useState } from 'react'
import styles from '../../styles/Auth.module.css'
import { useRouter } from 'next/router';
import { validateEmail } from '../../common';

const Register = ({ setModel }: { setModel: React.Dispatch<React.SetStateAction<string>> }) => {




    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const router = useRouter();


    const registerHandler = async () => {
        if (!(email.length > 0) || !(password.length > 4) || !(username.length>4)) {
            if (!validateEmail(email)) {
                // toast("Please enter vaild email");  
                alert('Please enter vaild email')
                return;
            }
            console.log(email,password,username)
            alert("length is not enough");
            return
        }
        // setLoading(true)
        const res = await fetch(`/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                name:username
            }),
        });
        let response = await res.json();
        console.log(response)
        if (response.message == "Success!") {
            //   setLoading(false)
            console.log('success')
            router.reload();
        } else {
            //   setLoading(false)
            alert("miss match");
        }
    };


    return (
        <div className={styles.authCard}>
            <h1>Register</h1>
            <form>

                <div className={styles.InputHolder}>
                    <label htmlFor='userame'>Username</label>
                    <input type='username' name='username' value={username} onChange={e => setUserName(e.target.value)} />
                </div>

                <div className={styles.InputHolder}>
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className={styles.InputHolder}>
                    <label htmlFor='passworrd'>Password</label>
                    <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type='button' onClick={registerHandler}>Register</button>
                <p className={styles.info}>Already have an account? <span onClick={() => setModel('login')}>Login</span></p>
            </form>
        </div>
    )
}

export default Register