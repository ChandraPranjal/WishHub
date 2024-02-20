const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const verifyJWT = async (req, res, next) => {
  try {
    // console.log( req.cookies.accessToken );
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new Error("Unauthorised Request");

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(
      decodedToken?.id,
      "-refreshToken -password"
    );

    if (!user) throw new Error("Invalid Access Token");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json("Invalid Access Token");
  }
};

module.exports = { verifyJWT };
