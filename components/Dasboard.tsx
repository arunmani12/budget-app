import React from 'react'
import styles from '../styles/Home.module.css'
import Bar from '../components/Bar';
import { useState } from 'react';
import BudgetModel from '../components/BudgetModel';
import TransActionModel from '../components/Transaction';
import Friends from './Friends';
import 'react-toastify/dist/ReactToastify.css';
import CategoriesCard from './cards/categories';
import ExpenseCard from './cards/Expense';
import DebtAndCreditCard from './cards/DebtAndCreditCard';
import {BiLogOut} from 'react-icons/bi'
import { useRouter } from 'next/router';



interface Categories {
  Food: number,
  "restaurants & Cafe": number,
  Fuel: number,
  Education: number,
  Rent: number,
  Others: number
}


interface Dashboard {
  Categories: Categories,
  user: any,
  debit: number,
  credit: number,
  todayExpense: number,
  expenseByMonth: number[],
  totalExpense: number
}



const Dasboard = ({
  Categories,
  user,
  credit,
  debit,
  todayExpense,
  expenseByMonth,
  totalExpense
}: Dashboard) => {

  const [openBudget, setOpenBudget] = useState<boolean>(false)
  const [openTransaction, setOpenTransaction] = useState<boolean>(false)



  const [frndsToShow, setFrndsToShow] = React.useState(user.Friends)
  const [currentShow, setCurrentShow] = React.useState('you own')

  React.useEffect(() => {
    var friendsCopy = [...user.Friends].filter(d => d.youOwn !== 0)
    setFrndsToShow(friendsCopy)
  }, [])

  const router = useRouter();


  const onYouOwnHandler = () => {


    var friendsCopy = [...user.Friends].filter(d => d.youOwn !== 0)

    setFrndsToShow(friendsCopy)

    setCurrentShow('you own')

  }

  const onHimHowHandler = () => {

    var friendsCopy = [...user.Friends].filter(d => d.himOwn !== 0)

    setFrndsToShow(friendsCopy)

    setCurrentShow('him own')

  }

   function delete_cookie(name:string) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  const logOutHandler = async() =>{
    const res = await fetch(`/api/logout`)

    let response = await res.json();

    if(response.message = 'Success'){
      delete_cookie('token')
      router.reload()
    }
  }

  return (
    <main className={styles.main}>

      {openBudget && <BudgetModel
        user={{ id: user._id, name: user.username + '(me)' }}
        friends={user.Friends} setOpenBudget={setOpenBudget}
      />}
      {openTransaction && <TransActionModel
        transactions={user.transactions}
        setOpenTransaction={setOpenTransaction}
      />}

      <div className={styles.MainHeader}>
        <div onClick={() => setOpenTransaction(prv => !prv)}>Transacation</div>
        <div onClick={() => setOpenBudget(prv => !prv)}>New Budget</div>
        <div onClick={logOutHandler}><BiLogOut/></div>
      </div>

      <div className={styles.overview}>

        <CategoriesCard Categories={Categories} />

        <ExpenseCard credit={credit} debit={debit} todayExpense={todayExpense} />

        <Friends friends={user.Friends} />

      </div>

      <DebtAndCreditCard
        onHimHowHandler={onHimHowHandler}
        onYouOwnHandler={onYouOwnHandler}
        frndsToShow={frndsToShow}
        currentShow={currentShow} />

      <Bar expenseByMonth={expenseByMonth} totalExpense={totalExpense} />

    </main>
  )
}

export default Dasboard
