import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const userModel = new Schema({
    username:{ type: String, required: true },
    email:{type: String, required: true},
    password:{type: String, required: true},
    Friends:[  {
       id : {type:String,required:true},
       youOwn:{type:Number,required:true},
       himOwn:{type:Number,required:true},
       name:{type:String,required:true}
    }],
    transactions:[{
        type:Schema.Types.ObjectId,
        ref:'Transactions'
    }]
},
{ timestamps: true })

module.exports = mongoose.models.User ||  mongoose.model("User", userModel);