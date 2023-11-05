import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req?.headers?.authorization;
    if (!token) return res.status(403).send("Access denied");
    if (!token.startsWith("Bearer "))
      return res.status(403).send("bearer token was not found");
    token = token.slice(7);
    let decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return res.status(403).send("JWT token expired");
    decode = { ...decode };
    delete decode.password;
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
