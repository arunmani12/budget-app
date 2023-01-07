import React from 'react'
import styles from '../styles/Bar.module.css'
import { FaRupeeSign } from 'react-icons/fa'

interface datewiseSpending {
    month: string,
    spend: number
}




const Bar = ({expenseByMonth,totalExpense}:{expenseByMonth:number[],totalExpense:number}) => {


    const dateWiseSpending: datewiseSpending[] = [
        {
            month: 'jan',
            spend: expenseByMonth[0]
        },
        {
            month: 'feb',
            spend: expenseByMonth[1]
        },
        {
            month: 'mar',
            spend: expenseByMonth[2]
        },
        {
            month: 'apr',
            spend: expenseByMonth[3]
        },
        {
            month: 'may',
            spend: expenseByMonth[4]
        },
        {
            month: 'jun',
            spend:  expenseByMonth[5]
        },
        {
            month: 'july',
            spend:  expenseByMonth[6]
        },
        {
            month: 'aug',
            spend:  expenseByMonth[7]
        },
        {
            month: 'sep',
            spend:  expenseByMonth[8]
        },
        {
            month: 'oct',
            spend:  expenseByMonth[9]
        },
        {
            month: 'nov',
            spend:  expenseByMonth[10]
        },
        {
            month: 'dec',
            spend:  expenseByMonth[11]
        }
    ]


    var limit = Math.max(...expenseByMonth) * 1.5



    return (
        <div className={styles.expenseHolder}>

            <div className={styles.expense}>

                <FaRupeeSign size={43} color='#b81e75' />
                <p>- {totalExpense}</p>
                <p style={{color:'#54bf54'}}>Total Expense</p>
            </div>

            <h1>Year Wise</h1>

            <div className={styles.barContainer}>
                {
                    dateWiseSpending.map((d) => (
                        <div key={d.month} className={styles.month}>
                            <div className={styles.bar}>
                                <div style={{ height: (100 * d.spend/limit)+'%', width: '100%', background: 'rgb(255, 132, 132)' }} />
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