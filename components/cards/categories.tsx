import React from 'react'
import styles from '../../styles/Home.module.css'
import { IoFastFood, IoRestaurantSharp, IoSchoolSharp } from 'react-icons/io5';
import { AiFillCar, AiOutlineHome } from 'react-icons/ai'
import { FaMoneyBillAlt } from 'react-icons/fa'


interface Categories {
    Food: number,
    "restaurants & Cafe": number,
    Fuel: number,
    Education: number,
    Rent: number,
    Others: number
}

interface Catergory {
    name: string,
    icon: React.ReactNode,
    spend: number,
  }
  


const CategoriesCard = ({ Categories }: { Categories: Categories }) => {

    const category: Catergory[] = [
        { name: 'Food', icon: <IoFastFood color='#29b569' />, spend: Categories['Food'] },
        { name: 'restaurants & Cafe', icon: <IoRestaurantSharp color='#f65a41' />, spend: Categories['restaurants & Cafe'] },
        { name: 'Fuel', icon: <AiFillCar color='#b81e75' />, spend: Categories['Fuel'] },
        { name: 'Education', icon: <IoSchoolSharp color='#494dbb' />, spend: Categories['Education'] },
        { name: 'Rent', icon: <AiOutlineHome color='#229396' />, spend: Categories['Rent'] },
        { name: 'Others', icon: <FaMoneyBillAlt color='#ed1c59' />, spend: Categories['Others'] }
    ]

    return (
        <div className={styles.col}>
            <p className={styles.headingPrimary}>Categories</p>
            <div className={styles.headbody}>
                {
                    category.map((d: any, i: number) => (
                        <div key={i} className={styles.catoHolder}>

                            <p>{d.icon} {d.name}</p>

                            <p>&#x20b9;{d.spend.toFixed()}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoriesCard