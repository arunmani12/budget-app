import React from 'react'
import styles from '../styles/Budget.module.css'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { FaRupeeSign } from 'react-icons/fa'





// { setCurrentStep }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>> }
const BudgetForm = () => {


    const [step, setStep] = React.useState<number>(0)

    const [expense,setExpense] = React.useState<number>(0)

    const [selected, setSelected] = React.useState<number[]>([])


    const friends: string[] = ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu','Kamalesh','Kamalesh']

    const showList = friends.slice(step, step + 4)

    const onRightClickHandler = (): void => {
        if (step + 4 > friends.length-1) return
        setStep(prv => prv + 4)
    }


    const onLeftClickHandler = (): void => {

        if (step === 0) return

        setStep(prv => prv - 4)
    }

    const calculatePrice = () =>{
        if(!selected.length) return 'Per'
        return (expense/selected.length).toFixed(2)
    }

    const onClickHandler = (index: number): void => {
        let currerntIndex = index + step

        const i = selected.indexOf(currerntIndex);
      
        if (i > -1) { // only splice array when item is found
            let copyObject = [...selected]

            copyObject.splice(i, 1); // 2nd parameter means remove one item only
            
            setSelected(copyObject)

            return
        }

        let copyObject = [...selected]

        copyObject.push(currerntIndex)

        setSelected(copyObject)
    }

    const isSelected = (index: number) => {

        const isFound = selected.filter(d => d === index)

        return isFound.length
    }

    return (
        <form>
            <div className={styles.formHelpher}>
                <div className={styles.helpherLeft}>
                    <div className={styles.budgetLableHolder}>
                        <label htmlFor="pet-select">Category:</label>

                        <select id="pet-select">
                            <option value="">--Please choose an option--</option>
                            <option value="Food">Food</option>
                            <option value="restaurants & Cafe">restaurants & Cafe</option>
                            <option value="Fuel">Fuel</option>
                            <option value="Education">Education</option>
                            <option value="Rent">Rent</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className={styles.budgetLableHolder}>
                        <label>Expense(&#8377;)</label>
                        <input type='number' value={expense} onChange={(e)=>setExpense(+e.target.value)}/>
                    </div>


                    <div className={styles.budgetLableHolder}>
                        <label htmlFor="pet-select">Paid By:</label>

                        <select id="pet-select">
                            <option value="">--Please choose an option--</option>
                            {friends.map((d, i) => (
                                <option key={i} value="goldfish">{d}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.budgetLableHolder}>
                        <label>description</label>
                        <textarea />
                    </div>

                </div>


                <div className={styles.helpherRight}>

                    <div className={styles.budgetLableHolder}>
                        <label>Partcitipations</label>
                        <div className={styles.membersHolder}>
                            {
                                showList.map((d, i) => (
                                    <p onClick={() => onClickHandler(i)} style={{
                                        background: isSelected(i + step) ? '#4d54bd' : 'none',
                                        color: isSelected(i + step) ? '#fff' : '#000',
                                        cursor:'pointer'
                                    }} key={i}>{d}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.budgetHelpher}>
                        <p>Selected : {selected.length}</p>
                        <div>
                            <AiFillCaretLeft size={34} onClick={onLeftClickHandler} />
                            <AiFillCaretRight size={34} onClick={onRightClickHandler} />
                        </div>
                    </div>

                    <div className={styles.personDiv}>
                        <p>Total : &#8377;{expense}</p>
                        <p>Splited :&#8377;{calculatePrice()}/Person </p>
                    </div>
                </div>
            </div>

            <div className={styles.nextBtn}>
                <p> Submit</p>
                <AiFillCaretRight />
            </div>

        </form>
    )
}

export default BudgetForm