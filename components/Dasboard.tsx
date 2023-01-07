import React from 'react'
import styles from '../styles/Home.module.css'
import { IoFastFood, IoRestaurantSharp, IoSchoolSharp } from 'react-icons/io5';
import { AiFillCar, AiOutlineHome } from 'react-icons/ai'
import { FaMoneyBillAlt } from 'react-icons/fa'
import Bar from '../components/Bar';
import { useState } from 'react';
import BudgetModel from '../components/BudgetModel';
import TransActionModel from '../components/Transaction';
import Friends from './Friends';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Catergory {
  name: string,
  icon: React.ReactNode,
  spend:number,
}






const Dasboard = ({Categories, user ,credit,debit,todayExpense}: {Categories:any, user: any,debit:any,credit:any,todayExpense:number }) => {


  const category: Catergory[] = [
    { name: 'Food', icon: <IoFastFood color='#29b569' /> ,spend:Categories['Food']},
    { name: 'restaurants & Cafe', icon: <IoRestaurantSharp color='#f65a41' /> ,spend:Categories['restaurants & Cafe']},
    { name: 'Fuel', icon: <AiFillCar color='#b81e75' /> ,spend:Categories['Fuel']},
    { name: 'Education', icon: <IoSchoolSharp  color='#494dbb'/> ,spend:Categories['Education']},
    { name: 'Rent', icon: <AiOutlineHome color='#229396'/> ,spend:Categories['Rent']},
    { name: 'Others', icon: <FaMoneyBillAlt color='#ed1c59'/>,spend:Categories['Others'] }
  ]

  const [openBudget, setOpenBudget] = useState<boolean>(false)
  const [openTransaction, setOpenTransaction] = useState<boolean>(false)



  const [frndsToShow,setFrndsToShow] = React.useState(user.Friends)
  const [currentShow,setCurrentShow] = React.useState('you own')

  React.useEffect(()=>{
    var friendsCopy = [...user.Friends].filter(d=>d.youOwn!==0)
    setFrndsToShow(friendsCopy)
  },[])

  console.log(user.Friends)

  const onYouOwnHandler = () =>{


    var friendsCopy = [...user.Friends].filter(d=>d.youOwn!==0)

    setFrndsToShow(friendsCopy)

    setCurrentShow('you own')

  }

  const onHimHowHandler = () =>{

    var friendsCopy = [...user.Friends].filter(d=>d.himOwn!==0)

    setFrndsToShow(friendsCopy)

    setCurrentShow('him own')

  }


  console.log(frndsToShow,currentShow)

  return (
    <main className={styles.main}>

      
      <ToastContainer />

      {openBudget && <BudgetModel user={{ id: user._id, name: user.username + '(me)' }} friends={user.Friends} setOpenBudget={setOpenBudget} />}
      {openTransaction && <TransActionModel transactions={user.transactions} setOpenTransaction={setOpenTransaction} />}

      <div className={styles.MainHeader}>
        <div onClick={() => setOpenTransaction(prv => !prv)}>Transacation</div>
        <div onClick={() => setOpenBudget(prv => !prv)}>New Budget</div>
      </div>

      <div className={styles.overview}>

        <div className={styles.col}>
          <p className={styles.headingPrimary}>Categories</p>
          <div className={styles.headbody}>
            {
              category.map((d, i) => (
                <div key={i} className={styles.catoHolder}>

                  <p>{d.icon} {d.name}</p>

                  <p>&#x20b9;{d.spend.toFixed()}</p>
                </div>
              ))
            }
          </div>
        </div>

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
                  color:'#29b569'
                }}>+&#x20b9;{credit.toFixed(2)}</p>
            </div>
            <div>
              <h3>Total Debit</h3>
              <p style={{
                  color:'#ff8484'
                }}>-&#x20b9;{debit.toFixed(2)}</p>
            </div>
          </div>
        </div>



        <Friends friends={user.Friends} />

      </div>


      <div className={`${styles.overview} ${styles.friendsCandDcard}`}>

         <div className={styles.left}>
            <div className={styles.btn}>
              <p onClick={onYouOwnHandler}>Who Owns You</p>
              <p onClick={onHimHowHandler}>You who Owns</p>
            </div>
         </div>
         <div className={styles.right}>
          <h3>Friends</h3>
         {frndsToShow.map((d:any)=>(
              <div className={styles.table}>
                <p>{d.name}</p>
                {currentShow === 'you own' ?<p style={{
                  color:'#29b569'
                }}>+ &#x20b9;{d.youOwn.toFixed(2)}</p>:<p style={{
                  color:'#ff8484'
                }}>- &#x20b9;{d.himOwn.toFixed(2)}</p>}
              </div>
            ))}
         </div>

      </div>
      

      {/* <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
          </p>
        </div> */}
      <Bar />

    </main>
  )
}

export default Dasboard