import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { verify } from "jsonwebtoken";
import Transactions from '../../models/Transactions'

dbConnect();

const secret = "arunmani";


export default async function handler(req, res) {

    const { method } = req;

    if (method === "POST") {

        try{
            

            const jwt = req.headers.authorization

            if (!jwt) {
                res.status(403).json({ message: "un authorized" });
            }
    
            const dataFromToken = verify(jwt, secret);
    
            const currentUser = await User.findOne({ email: dataFromToken.email }).populate("transactions");

            let friends = []

            for (let frnd of currentUser.Friends){

                let id = frnd.id

                let user = await User.findById(id);

                friends.push({
                    name:user.username,
                    id,
                    youOwn:frnd.youOwn,
                    himOwn:frnd.youOwn
                })

            }

            let credit = 0

            let debit = 0

            let Categories ={
                "Food":0,
                "restaurants & Cafe" : 0,
                "Fuel":0,
                "Education":0,
                "Rent":0,
                "Others":0
            }

            let todayExpense = 0

            for(let transactions of currentUser.transactions){
                Categories[transactions.Category] = Categories[transactions.Category] + (transactions.Expense / transactions.Participants.length)

                var transactionDate = new Date(transactions.createdAt)

                let entryDay =  transactionDate.getDate() + '-' +transactionDate.getMonth()+ '-' +transactionDate.getFullYear()

                let todayday = new Date().getDate() + '-' +new Date().getMonth() + '-' + new Date().getFullYear()

                if(todayday === entryDay){

                    todayExpense = transactions.Expense / transactions.Participants.length + todayExpense
                }  

            }

            console.log(todayExpense)

            for(let frnds of currentUser.Friends){

                credit = frnds.himOwn + credit

                debit = frnds.youOwn + debit

            }  

            return res.status(200).json({ user:currentUser ,credit,debit,Categories,todayExpense:todayExpense});

        
        }catch(e){

            console.log(e)
            return res.status(403).json({ message:'something went to wrong' });
        }

    }

}