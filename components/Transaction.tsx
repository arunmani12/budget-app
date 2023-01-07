import React, { Dispatch, SetStateAction } from 'react'
import { MdCancel } from 'react-icons/md'
import transtyles from '../styles/Transactions.module.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'


const TransActionModel = ({ setOpenTransaction ,transactions}: { setOpenTransaction: Dispatch<SetStateAction<boolean>>,transactions:any }) => {

    // const [currentStep, setCurrentStep] = React.useState<number>(1)

    console.log(transactions)

    // const transaction = [
    //     {
    //         category: 'Food',
    //         desc: 'lore adef xvlas  sdvds v dsv dv s df vfvdfv fddf vf v dfvwsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
    //         part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
    //         amount: 32422,
    //         data: new Date(),
    //         paidBy: 'Arunmani'
    //     },
    //     {
    //         category: 'Food',
    //         desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
    //         part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
    //         amount: 32422,
    //         data: new Date(),
    //         paidBy: 'Arunmani'
    //     },
    //     {
    //         category: 'food',
    //         desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
    //         part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
    //         amount: 32422,
    //         data: new Date(),
    //         paidBy: 'Arunmani'
    //     },
    //     {
    //         category: 'food',
    //         desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
    //         part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
    //         amount: 32422,
    //         data: new Date(),
    //         paidBy: 'Arunmani'
    //     },
    //     {
    //         category: 'food',
    //         desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
    //         part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
    //         amount: 32422,
    //         data: new Date(),
    //         paidBy: 'Arunmani'
    //     },
    //     {
    //         category: 'food',
    //         desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
    //         part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
    //         amount: 32422,
    //         data: new Date(),
    //         paidBy: 'Arunmani'
    //     }
    // ]


    const [prvOpen, setPrvOpen] = React.useState(false)

    const [currentPrv, setCurrentPrv] = React.useState(0)

    const onClickNextHandler = (i:number) =>{
        setCurrentPrv(i)
        setPrvOpen(prv=>!prv)
    }

    const onClickPrv = () =>{
        setPrvOpen(prv=>!prv)
    }



    return (
        <div className={transtyles.modelContainer}>
            <div className={transtyles.model}>
                <MdCancel
                    color='red'
                    size={24}
                    style={{
                        position: 'absolute',
                        top: '0',
                        right: '0'
                    }}
                    onClick={() => setOpenTransaction(prv => !prv)}
                />
                <h1>Transactions</h1>

                {prvOpen && <div className={transtyles.scrollBar}>
                    {
                        transactions.map((d:any, i:number) => (
                            <div key={i} className={transtyles.trans} onClick={()=>onClickNextHandler(i)}>
                                <div>
                                    <h3 className={transtyles.category}>{d.category}</h3>
                                    <p className={transtyles.Description}> {d.Description}</p>
                                    <span> -&#8377;{d.Expense}</span>
                                    {/* <p className={transtyles.date}>{d.entryBy.getDate()}/{d.entryBy.getMonth()}/{d.entryBy.getFullYear()}</p> */}
                                    <p className={transtyles.date}>hi</p>
                                </div>
                                <div>
                                    <FaArrowRight/>
                                </div>
                            </div>
                        ))
                    }

                </div>}

                {!prvOpen && transactions.length && <div className={transtyles.scrollBar}>
                    <FaArrowLeft style={{ marginTop: '10px' }} onClick={onClickPrv}/>
                    <div className={transtyles.prvHolder}>
                        <p><span>Category</span>:{transactions[currentPrv].Category}</p>
                        <p><span>Total Price:</span>&#8377;{transactions[currentPrv].Expense}</p>
                        <p><span>Description</span>: {transactions[currentPrv].Description}</p>
                        <p><span>Paid By</span> : {transactions[currentPrv].PaidBy}</p>
                        <p><span>Participaters</span></p>
                        <div className={transtyles.participateContainer}>
                            {
                                transactions[currentPrv].Participants.map((d:any, i:any) => <p key={i}>{d.id}</p>)
                            }
                        </div>
                        <p><span>Total Split</span>: {transactions[currentPrv].Participants.length}</p>
                        <p><span>Amount/Person</span>: {transactions[currentPrv].Expense/transactions[currentPrv].Participants.length}</p>
                        <div className={transtyles.btnStyleHolder}>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>


                </div>}


                <div className={transtyles.container}>

                </div>

            </div>
        </div>
    )
}

export default TransActionModel