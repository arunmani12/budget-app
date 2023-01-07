import React from 'react'
import styles from '../../styles/Home.module.css'

interface ExpenseCard {
    todayExpense:number
    credit:number,
    debit:number
}

const ExpenseCard = ({todayExpense,credit,debit}:ExpenseCard) => {
  return (
    <div className={styles.col}>
          <p className={styles.headingPrimary}>Total Expenses</p>
          <div className={styles.expense}>
            <div>
              <h3>&#x20b9;<span>{todayExpense.toFixed(2)}</span></h3>
              <p>Today</p>
            </div>
          </div>
          <div className={styles.credAndDept}>
            <div>
              <h3>Total Credit</h3>
              <p style={{
                color: '#29b569'
              }}>+&#x20b9;{credit.toFixed(2)}</p>
            </div>
            <div>
              <h3>Total Debit</h3>
              <p style={{
                color: '#ff8484'
              }}>-&#x20b9;{debit.toFixed(2)}</p>
            </div>
          </div>
        </div>
  )
}

export default ExpenseCard