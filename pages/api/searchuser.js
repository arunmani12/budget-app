import dbConnect from "../../db/connectDb";
import User from "../../models/User";

dbConnect();


export default async function handler(req, res) {

    const { method } = req;

    if (method === "POST") {

        const username = req.body.name

        const user = await User.findOne({ username });
    
        if(user){
            res.status(401).json({ message: "success",user:{_id:user._id,name:user.username}});
        }
        
        res.status(401).json({ message: "no user" });
    }
   
}