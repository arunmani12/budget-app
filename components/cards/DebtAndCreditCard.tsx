import React from 'react'
import styles from '../../styles/Home.module.css'


interface DebtAndCreditCard {
    onYouOwnHandler: () => void,
    onHimHowHandler: () => void,
    currentShow:string,
    frndsToShow:any
}


const DebtAndCreditCard = ({onYouOwnHandler,onHimHowHandler,currentShow,frndsToShow}:DebtAndCreditCard) => {
  return (
    <div className={`${styles.overview} ${styles.friendsCandDcard}`}>
        <div className={styles.left}>
          <div className={styles.btn}>
            <p onClick={onYouOwnHandler} style={{
              background: currentShow === 'you own' ? '#868ce38f' : 'none'
            }}>who you owe</p>
            <p onClick={onHimHowHandler} style={{
              background: currentShow !== 'you own' ? '#868ce38f' : 'none'
            }}>who owes you</p>
          </div>
        </div>
        <div className={styles.right}>
          <h3>Friends</h3>
          {frndsToShow.map((d: any) => (
            <div key={d.id} className={styles.table}>
              <p>{d.name}</p>
              {currentShow === 'you own' ? <p style={{
                color: '#ff8484'
              }}>- &#x20b9;{d.youOwn.toFixed(2)}</p> : <p style={{
                color: '#29b569'
              }}>+ &#x20b9;{d.himOwn.toFixed(2)}</p>}
            </div>
          ))}
        </div>

      </div>
  )
}

export default DebtAndCreditCard