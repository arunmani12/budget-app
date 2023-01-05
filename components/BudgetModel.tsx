import React, { Dispatch, SetStateAction } from 'react'
import styles from '../styles/Budget.module.css'
import BudgetForm from './BudgetForm'
import BudgetModelPrv from './BudgetModelPrv';
import {MdCancel} from 'react-icons/md'


const BudgetModel = ({setOpenBudget}:{setOpenBudget: Dispatch<SetStateAction<boolean>>}) => {

    // const [currentStep, setCurrentStep] = React.useState<number>(1)

    return (
        <div className={styles.modelContainer}>
            <div className={styles.model}>
                <MdCancel 
                color='red'
                size={24}
                style={{
                    position:'absolute',
                    top:'0',
                    right:'0'
                }}
                onClick={()=>setOpenBudget(prv=>!prv)}
                />
                <h1>New Budget</h1>
                <BudgetForm/>
                {/* {
                    currentStep === 1
                        ? <BudgetForm setCurrentStep={setCurrentStep} />
                        : <BudgetModelPrv setCurrentStep={setCurrentStep}/>
                } */}
            </div>
        </div>
    )
}

export default BudgetModel