import React from 'react'
import styles from '../styles/Budget.module.css'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'


const BudgetModelPrv = ({ setCurrentStep }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div>

            <p>Category : Home</p>

            <h4>Allocation</h4>

            <div className={styles.budgetLableHolder}>
                        <label>Partcitipations</label>
                        <div className={styles.membersHolder}>
                            {
                                ["arun", "arun", "arun", "arunmani"].map((d, i) => (
                                    <div className={styles.indiviualPrice}>
                                        <p key={i}>{d}</p>
                                        <p>876</p>
                                    </div>
                                ))
                            }
                        </div>
             </div>

            <div className={styles.nextBtn} onClick={() => setCurrentStep(prv => prv - 1)}>
                <AiFillCaretLeft />
                <p> Prv</p>
            </div>
        </div>
    )
}

export default BudgetModelPrv