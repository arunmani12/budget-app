import React from 'react'
import styles from '../styles/Budget.module.css'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const BudgetForm = ({ friends, user, setOpenBudget}: { friends: any, user: any ,setOpenBudget:React.Dispatch<React.SetStateAction<boolean>>}) => {


    const router = useRouter();


    const [step, setStep] = React.useState<number>(0)

    const [expense, setExpense] = React.useState<number>(0)

    const [selected, setSelected] = React.useState<number[]>([])

    const [frds, setFrnds] = React.useState<any>(friends)

    const [loading,setLoading] = React.useState(false)

    const [data, setData] = React.useState<{
        Category: string,
        Expense: number,
        PaidBy: string,
        Description: string,
        Participants: any[],
    }>({
        Category: '',
        Expense: expense,
        PaidBy: '',
        Description: '',
        Participants: [],
    })

    React.useEffect(() => {

        var frdCopy = [...frds]

        var isThereAlready = false

        for (let frds of frdCopy) {

            if (frds.id === user.id) {

                isThereAlready = true
            }

        }

        if (!isThereAlready) {
            frdCopy.push(user)
            setFrnds(frdCopy)
        } else {
            setFrnds(frdCopy)
        }

    }, [])



    const showList = frds?.slice(step, step + 4)

    const onRightClickHandler = (): void => {
        if (step + 4 > frds.length - 1) return
        setStep(prv => prv + 4)
    }


    const onLeftClickHandler = (): void => {

        if (step === 0) return

        setStep(prv => prv - 4)
    }

    const calculatePrice = () => {
        if (!selected.length) return 'Per'
        return (expense / selected.length).toFixed(2)
    }

    const onClickHandler = (index: number): void => {
        let currerntIndex = index + step

        const i = selected.indexOf(currerntIndex);

        if (i > -1) { 
            let copyObject = [...selected]

            copyObject.splice(i, 1); 

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


    const onExpenseChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpense(+e.target.value)

        setData(prv => (
            {
                ...prv, Expense: +e.target.value
            }
        ))
    }

    const onSubmitHandler = async () => {

        setLoading(true)

        var part: any = []

        for (let val of selected) {
            part.push({ id: frds[val].id })
        }

        setData(prv => (
            {
                ...prv, Participants: part
            }
        ))

        let isPaidByIncluded = false

        for (let par of part) {
            if (par.id === data.PaidBy) {
                isPaidByIncluded = true
                break;
            }
        }

        if (!isPaidByIncluded) {
            setLoading(false)
            return toast.error('Please include paid by user(Friends)')
            
        }

        if (data.Expense < 1) {
            setLoading(false)
            return toast.error('Invalid Expense')
        }

        if (!data.Category.length) {
            setLoading(false)
            return toast.error('Please select category')
        }

        if (data.Description.length < 5) {
            setLoading(false)
            return toast.error('description characters are not enough')
        }

       
        const res = await fetch(`/api/addbudget`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,Participants:part
            }),
        });
        let response = await res.json();

        if (response.message == "ok!") {
            setLoading(false)
            setData({
                Category:'',
                Expense:expense,
                PaidBy:'',
                Description:'',
                Participants:[],
            })
            router.replace(router.asPath); //refetch the data
            setOpenBudget(prv=>!prv)
        } else {
            setLoading(false)
            toast.error('something went to wrong')
        }

    }

    return (
        <form>
           {loading && <div className={styles.loader}>
                <div style={{ marginTop: '10px' }} className="lds-hourglass"></div>
            </div>}
            <div className={styles.formHelpher}>
                <div className={styles.helpherLeft}>
                    <div className={styles.budgetLableHolder}>
                        <label htmlFor="category">Category:</label>

                        <select id="category" value={data.Category} name='Category' onChange={(e) => {
                            setData(prv => (
                                { ...prv, Category: e.target.value }
                            ))
                        }}>
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
                        <label htmlFor='expense'>Expense(&#8377;)</label>
                        <input type='number' id='expense' value={expense} onChange={(e) => onExpenseChangeHandler(e)} />
                    </div>


                    <div className={styles.budgetLableHolder}>
                        <label htmlFor="paid-by">Paid By:</label>

                        <select id="paid-by" value={data.PaidBy} onChange={(e) => {
                            setData(prv => (
                                { ...prv, PaidBy: e.target.value }
                            ))
                        }}>
                            <option value="">--Please choose an option--</option>
                            {frds.map((d: any) => (
                                <option key={d.name} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.budgetLableHolder}>
                        <label htmlFor='description'>description</label>
                        <textarea id='description' value={data.Description} onChange={(e) => {
                            setData(prv => (
                                { ...prv, Description: e.target.value }
                            ))
                        }} />
                    </div>

                </div>


                <div className={styles.helpherRight}>

                    <div className={styles.budgetLableHolder}>
                        <label>Friends</label>
                        <div className={styles.membersHolder}>
                            {
                                showList.map((d: any, i: any) => (
                                    <p onClick={() => onClickHandler(i)} style={{
                                        background: isSelected(i + step) ? '#4d54bd' : 'none',
                                        color: isSelected(i + step) ? '#fff' : '#000',
                                        cursor: 'pointer'
                                    }} key={i}>{d.name}</p>
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

            <div onClick={onSubmitHandler} className={styles.nextBtn}>
                <p> Submit</p>
                <AiFillCaretRight />
            </div>
        </form>
    )
}

export default BudgetForm