import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { verify } from "jsonwebtoken";

dbConnect();

const secret = "arunmani";


export default async function handler(req, res) {

    const { method } = req;

    if (method === "POST") {

        const jwt = req.cookies.token;

        if (!jwt) {
            res.status(403).json({ message: "un authorized" });
        }

        const dataFromToken = verify(jwt, secret);

        const currentUser = await User.findOne({ email: dataFromToken.email });

        const id = req.body.id

        const user = await User.findById(id);


        let isFriends = false

        for (let frnds of currentUser.Friends) {

            if (frnds.id === id){

                isFriends = true

            }

        }

        if (isFriends) {
            return res.status(403).json({ message: "you guys are friends" });
        }



        if (currentUser._id === user._id) {
            return res.status(403).json({ message: "something wrong" });
        }

        let currentUserFriends = currentUser.Friends

        currentUserFriends.push({
            id: user._id,
            youOwn: 0,
            himOwn: 0,
            name: user.username
        })

        const currentFilter = { email: dataFromToken.email };

        const currentUpdate = { Friends: currentUserFriends };

        await User.findOneAndUpdate(currentFilter, currentUpdate, {
            new: true
        });

        let userFriends = user.Friends

        userFriends.push({
            id: currentUser._id,
            youOwn: 0,
            himOwn: 0,
            name: currentUser.username
        })

        const filter = { _id: id };

        const update = { Friends: userFriends };

        await User.findOneAndUpdate(filter, update, {
            new: true
        });

        if (user) {
            return res.status(200).json({ message: "success", user: { _id: user._id, name: user.username }, old: user });
        }

        return res.status(401).json({ message: "no user" });
    }

}