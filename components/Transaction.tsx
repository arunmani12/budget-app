import React, { Dispatch, SetStateAction } from 'react'
import { MdCancel } from 'react-icons/md'
import transtyles from '../styles/Transactions.module.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'


const TransActionModel = ({ setOpenTransaction }: { setOpenTransaction: Dispatch<SetStateAction<boolean>> }) => {

    // const [currentStep, setCurrentStep] = React.useState<number>(1)

    const transactions = [
        {
            category: 'Food',
            desc: 'lore adef xvlas  sdvds v dsv dv s df vfvdfv fddf vf v dfvwsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
            part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
            amount: 32422,
            data: new Date(),
            paidBy: 'Arunmani'
        },
        {
            category: 'Food',
            desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
            part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
            amount: 32422,
            data: new Date(),
            paidBy: 'Arunmani'
        },
        {
            category: 'food',
            desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
            part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
            amount: 32422,
            data: new Date(),
            paidBy: 'Arunmani'
        },
        {
            category: 'food',
            desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
            part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
            amount: 32422,
            data: new Date(),
            paidBy: 'Arunmani'
        },
        {
            category: 'food',
            desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
            part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
            amount: 32422,
            data: new Date(),
            paidBy: 'Arunmani'
        },
        {
            category: 'food',
            desc: 'lore adef xvlas wsf zxvds wrkswe asf eaxcmd erasfkfd efsfx',
            part: ['Arunmani', 'ManiKandan', 'Kamalesh', 'Vijayaragav', 'Yukesh', 'Anbu', 'Kamalesh', 'Kamalesh'],
            amount: 32422,
            data: new Date(),
            paidBy: 'Arunmani'
        }
    ]


    const [prvOpen, setPrvOpen] = React.useState(false)

    const [currentPrv, setCurrentPrv] = React.useState(0)

    const onClickNextHandler = () =>{
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
                        transactions.map((d, i) => (
                            <div key={i} className={transtyles.trans} onClick={onClickNextHandler}>
                                <div>
                                    <h3 className={transtyles.category}>{d.category}</h3>
                                    <p className={transtyles.description}> {d.desc}</p>
                                    <span> -&#8377;324</span>
                                    <p className={transtyles.date}>{d.data.getDate()}/{d.data.getMonth()}/{d.data.getFullYear()}</p>
                                </div>
                                <div>
                                    <FaArrowRight/>
                                </div>
                            </div>
                        ))
                    }

                </div>}

                {!prvOpen && <div className={transtyles.scrollBar}>
                    <FaArrowLeft style={{ marginTop: '10px' }} onClick={onClickNextHandler}/>
                    <div className={transtyles.prvHolder}>
                        <p><span>Category</span>:Food</p>
                        <p><span>Total Price:</span>&#8377;400</p>
                        <p><span>Description</span>: sdfds fsdv fdvdfg sdasd dcsefref rgfregsdc deecewcwef refgrefewr crcreferger vrev</p>
                        <p><span>Paid By</span> : Arunmani</p>
                        <p><span>Participaters</span></p>
                        <div className={transtyles.participateContainer}>
                            {
                                transactions[0].part.map((d, i) => <p key={i}>{d}</p>)
                            }
                        </div>
                        <p><span>Total Split</span>: 7</p>
                        <p><span>Amount/Person</span>: 20</p>
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