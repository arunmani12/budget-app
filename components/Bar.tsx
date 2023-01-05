import React from 'react'
import styles from '../styles/Bar.module.css'
import { FaRupeeSign } from 'react-icons/fa'

interface datewiseSpending {
    month: string,
    spend: number
}

const dateWiseSpending: datewiseSpending[] = [
    {
        month: 'jan',
        spend: 23
    },
    {
        month: 'feb',
        spend: 29
    },
    {
        month: 'mar',
        spend: 24
    },
    {
        month: 'apr',
        spend: 27
    },
    {
        month: 'may',
        spend: 23
    },
    {
        month: 'jun',
        spend: 29
    },
    {
        month: 'july',
        spend: 19
    },
    {
        month: 'aug',
        spend: 33
    },
    {
        month: 'sep',
        spend: 39
    },
    {
        month: 'oct',
        spend: 32
    },
    {
        month: 'nov',
        spend: 43
    },
    {
        month: 'dec',
        spend: 19
    }
]


const Bar = () => {
    return (
        <div className={styles.expenseHolder}>

            <div className={styles.expense}>

                <FaRupeeSign size={43} color='#b81e75' />
                <p>- 24,000</p>
                <p style={{color:'#54bf54'}}>Total Expense</p>
            </div>

            <h1>Year Wise</h1>

            <div className={styles.barContainer}>
                {
                    dateWiseSpending.map((d, i) => (
                        <div key={d.month} className={styles.month}>
                            <div className={styles.bar}>
                                <div style={{ height: d.spend + 'px', width: '100%', background: 'red' }} />
                            </div>
                            <p>{d.month}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Bar