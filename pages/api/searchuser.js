import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { verify } from "jsonwebtoken";

dbConnect();

const secret = "arunmani";


export default async function handler(req, res) {

    const { method } = req;

    if (method === "POST") {

        const jwt = req.cookies.token;

        if(!jwt){
            res.status(403).json({ message: "un authorized" });
        }

        const dataFromToken = verify(jwt, secret);

        const currentUser = await User.findOne({ email:dataFromToken.email });

        const username = req.body.name

        const user = await User.findOne({ username });

        if(!user){
            return res.status(401).json({ message: "no user" });
        }

        let isFriends = false

        for (let frnds of currentUser.Friends) {

            if (frnds.id === user._id.toString()){

                isFriends = true

            }

        }
    
            return res.status(200).json({ message: "success",user:{_id:user._id,name:user.username,isFriends}});

      
    }
   
}