import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export { generateToken };
