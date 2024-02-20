const express = require("express");

const {
  createUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getContacts,
  createContact,
  isAuthenticated,
} = require("../controllers/user.controllers");
const { verifyJWT } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.route("/register").post(createUser);

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/authenticated").get(verifyJWT,isAuthenticated);
userRouter.route("/contacts").get(verifyJWT, getContacts);
userRouter.route("/contacts").post(verifyJWT, createContact);

module.exports = { userRouter };

module.exports = { userRouter };
