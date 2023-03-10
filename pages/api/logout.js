import { serialize } from "cookie";

export default async function handler(req, res) {
  const { cookies } = req;

  const jwt = cookies.token;

  if (!jwt) {
    return res.json({ message: " you are already not logged in..." });
  } else {
    const serialised = serialize("token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success" });
  }
}