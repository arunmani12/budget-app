import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from 'bcrypt'


dbConnect();
const secret = "arunmani";


export default async function handler(req, res) {
    const { method } = req;
    if (method === "POST") {
        try {
            let { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) {

                const cmp = await bcrypt.compare(password, user.password);
                if (cmp) {

                    const token = sign(
                        {
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                            email,
                        },
                        secret
                    );
                    const serialised = serialize("token", token, {
                        secure: false,
                        maxAge: 60 * 60 * 24 * 30,
                        path: "/",
                    });
                    res.setHeader("Set-Cookie", serialised);    

                    res.status(200).json({ user, message: "Success!" });
                    
                } else {
                    res.status(403).json({ message: "email or password mismatch" });
                
                }

            }
            else {
                res.status(200).json({ data: "no user to be found" });
            }
        } catch (e) {
   
            res.status(401).json({ message: "something went to wrong" });
        }
    }
}