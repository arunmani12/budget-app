import React, { Dispatch, SetStateAction } from 'react'
import { MdCancel } from 'react-icons/md'
import transtyles from '../styles/Transactions.module.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const TransActionModel = ({ setOpenTransaction ,transactions}: { setOpenTransaction: Dispatch<SetStateAction<boolean>>,transactions:any }) => {

  
    const router = useRouter()

    const deleteTransActionDeleteHanlder = async(id:string) =>{
        const res = await fetch(`/api/delete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id
            }),
          });
          let response = await res.json();

        if(response.message === 'ok')  {
            setOpenTransaction(false)
            router.replace(router.asPath);
        }
        else{
            toast.error('something went wrong')
        }
    }


    const [prvOpen, setPrvOpen] = React.useState(true)

    const [currentPrv, setCurrentPrv] = React.useState(0)

    const onClickNextHandler = (i:number) =>{
        setCurrentPrv(i)
        setPrvOpen(prv=>!prv)
    }

    const onClickPrv = () =>{
        setPrvOpen(prv=>!prv)
    }

    

    const calc = (date:string) =>{

        let readableDate = new Date(date)

        let fullDate = readableDate.getDate() + '-' + readableDate.getMonth()+1 + '-' + readableDate.getFullYear()

        return (fullDate)

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
                                    <p className={transtyles.date}>{calc(d.createdAt)}</p>
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
                        <p><span>Paid By</span> : {transactions[currentPrv].PaidBy.name}</p>
                        <p><span>Participaters</span></p>
                        <div className={transtyles.participateContainer}>
                            {
                                transactions[currentPrv].Participants.map((d:any, i:any) => <p key={i}>{d.name}</p>)
                            }
                        </div>
                        <p><span>Total Split</span>: {transactions[currentPrv].Participants.length}</p>
                        <p><span>Amount/Person</span>: &#x20b9;{transactions[currentPrv].Expense/transactions[currentPrv].Participants.length}</p>
                        <div className={transtyles.btnStyleHolder}>
                            <button onClick={()=>deleteTransActionDeleteHanlder(transactions[currentPrv]._id)}>Delete</button>
                        </div>
                    </div>


                </div>}

            </div>
        </div>
    )
}

export default TransActionModel