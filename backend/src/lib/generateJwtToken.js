import jwt from "jsonwebtoken";

const generateJwtToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });


  res.cookie("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  });

  return token;

};

export default generateJwtToken;
