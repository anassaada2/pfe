import { getToken } from "next-auth/jwt";

export default async function authMiddleware(req, res, next) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  req.user = token.user;
  next();
}
