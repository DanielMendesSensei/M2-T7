import jwt from "jsonwebtoken";

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "your-default-secret",
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
