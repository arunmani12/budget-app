import React, { useState } from 'react'
import styles from '../../styles/Auth.module.css'
import { useRouter } from 'next/router';
import { validateEmail } from '../../common';
import { toast } from 'react-toastify';


const Register = ({ setModel,setLoading }: { 
    setModel: React.Dispatch<React.SetStateAction<string>>,
    setLoading:React.Dispatch<React.SetStateAction<boolean>> 
}) => {




    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const router = useRouter();


    const registerHandler = async () => {
        setLoading(true)
        if (!(email.length > 5) || !(password.length > 5) || !(username.length>4)) {
            if (!validateEmail(email)) {  
                toast.error('Please enter vaild email')
                setLoading(false)
                return;
            }
            setLoading(false)
            toast.error("character length is not enough");
            return
        }
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
        if (response.message == "Success!") {
            setLoading(false)
            router.reload();
        }
        else if(response.message == "user is there"){
            setLoading(false)
            toast.error("username or email is already registered");
        }
        else {
            setLoading(false)
            toast.error("something went to wrong");
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