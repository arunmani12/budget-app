import dbConnect from "../../db/connectDb";
import Transactions from "../../models/Transactions";

dbConnect();


export default async function handler(req, res) {

    const { method } = req;

    if (method === "POST") {

        try {

            const jwt = req.cookies.token;

            if (!jwt) {
                return res.status(403).json({ message: "un authorized" });
            }

            await Transactions.findByIdAndDelete(req.body.id)

            return res.status(200).json({ message: "ok" });

        } catch (e) {
   
            return res.status(403).json({ message: "something went to wrong" });
        }
    }

}