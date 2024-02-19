const express = require("express");

const {
  createUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getContacts,
  createContact,
} = require("../controllers/user.controllers");
const { verifyJWT } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.route("/register").post(createUser);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/contacts/:id").get( getContacts);
userRouter.route("/contacts/:id").post(createContact);

module.exports = { userRouter };

module.exports = { userRouter };
