import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const Transactions = new Schema({
    Category:{ type: String, required: true },
    Expense:{ type: Number, required: true },
    PaidBy:{
         id :{ type: String, required: true },
         name:{ type: String, required: true }
        },
    Description : {type: String},
    Participants:[{
        id:{type:String,required:true},
        name:{ type: String, required: true }
    }],
    entryBy:{ type: String, required: true } ,
},
{ timestamps: true })

module.exports = mongoose.models.Transactions || mongoose.model("Transactions", Transactions);