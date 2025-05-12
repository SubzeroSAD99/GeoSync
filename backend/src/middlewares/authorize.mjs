import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // pega do cookie
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ err: true, msg: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ err: true, msg: "Token expirado ou inválido" });
    }
    req.employee = decoded;
    next();
  });
};

export { authMiddleware };
