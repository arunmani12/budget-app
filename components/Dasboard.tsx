import React from 'react'
import styles from '../styles/Home.module.css'
import {IoFastFood,IoRestaurantSharp,IoSchoolSharp} from 'react-icons/io5';
import {AiFillCar,AiOutlineHome} from 'react-icons/ai'
import {FaMoneyBillAlt} from 'react-icons/fa'
import Bar from '../components/Bar';
import { useState } from 'react';
import BudgetModel from '../components/BudgetModel';
import TransActionModel from '../components/Transaction';
import Friends from './Friends';


interface Catergory {
    name : string,
    icon : React.ReactNode,
  }
  
  const category:Catergory[] = [
    {name:'Food',icon:<IoFastFood color='#29b569'/>},
    {name:'restaurants & Cafe',icon:<IoRestaurantSharp color='#f65a41'/>},
    {name:'Fuel',icon:<AiFillCar color='#b81e75'/>},
    {name:'Education',icon:<IoSchoolSharp/>},
    {name:'Rent',icon:<AiOutlineHome/>},
    {name:'Others',icon:<FaMoneyBillAlt/>}
  ]
  


const Dasboard = () => {


  const [openBudget,setOpenBudget] = useState<boolean>(false)
  const [openTransaction,setOpenTransaction] = useState<boolean>(false)

  return (
    <main className={styles.main}>

        {openBudget && <BudgetModel setOpenBudget={setOpenBudget}/>}
        {openTransaction && <TransActionModel setOpenTransaction={setOpenTransaction}/>}

        <div className={styles.MainHeader}>
          <div onClick={()=>setOpenTransaction(prv=>!prv)}>Transacation</div>
          <div onClick={()=>setOpenBudget(prv=>!prv)}>New Budget</div>
        </div>

        <div className={styles.overview}>

          <div className={styles.col}>
            <p className={styles.headingPrimary}>Categories</p>
            <div className={styles.headbody}>
              {
                category.map((d, i) => (
                  <div key={i} className={styles.catoHolder}>
                  
                    <p>{d.icon} {d.name}</p>
                   
                    <p>$100</p>
                  </div>
                ))
              }
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.headingPrimary}>Total Expenses</p>
            <div className={styles.expense}>
              <div>
                <h3>$<span>400</span></h3>
                <p>Today</p>
              </div>
              <div>
                <h3>$<span>700</span></h3>
                <p>Week</p>
              </div>
            </div>
          </div>


       
       <Friends/>

        </div>
        {/* <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
          </p>
        </div> */}
        <Bar/>

      </main>
  )
}

export default Dasboard