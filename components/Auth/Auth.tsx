import React from 'react'
import styles from '../../styles/Auth.module.css'
import Login from './Login'
import Register from './Register'

const Auth = () => {

    const [showModel,setModel] = React.useState('login')


    return (
        <div className={styles.main}>
            {showModel === 'login' ? <Login setModel ={setModel}/>
            :
            <Register setModel ={setModel}/>
            }
        </div>
    )
}

export default Auth