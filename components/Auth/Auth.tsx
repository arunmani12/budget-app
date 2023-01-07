import React from 'react'
import styles from '../../styles/Auth.module.css'
import Login from './Login'
import Register from './Register'

const Auth = () => {

    const [showModel,setModel] = React.useState('login')
    const [loading,setLoading] = React.useState(false)


    return (
        <div className={styles.main}>
            {loading && <div className={styles.loader}>
                <div style={{ marginTop: '10px' }} className="lds-hourglass"></div>
            </div>}
            {showModel === 'login' ? <Login setLoading={setLoading} setModel ={setModel}/>
            :
            <Register setLoading={setLoading} setModel ={setModel}/>
            }
        </div>
    )
}

export default Auth