import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from 'bcrypt'

dbConnect();
const secret = "arunmani";
const saltRounds = 10;


export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {

      const { email, name, password } = req.body;

      const userIsThere = await User.find({ email });

      const userByEmail = await User.find({ username:name });

      if (userIsThere.length || userByEmail.length) {
        return res.status(403).json({ message: "user is there" });
      }

      if (!email || !name.length>4 || !password.length>4) {
        return res.status(403).json({ message: "Please enter valid fields" });
      }
       
      const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);

      const user = await new User({
        username:name,
        email:email,
        password:hashedPwd,
        Friends:[],
        transactions:[]
      });

      await user.save();

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

      res.status(200).json({ message: "Success!" })
    } catch (e) {

      res.status(401).json({ message: "something went to wrong" });
      
    }
  }
}