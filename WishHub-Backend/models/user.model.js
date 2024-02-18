const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Customer"],
      default: "Customer",
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    virtuals: {
      id: {
        get() {
          return this._id;
        },
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(
      this.password,
      +process.env.saltRounds
    );
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//########################################################################
UserSchema.methods.isPasswordCorrect = function (myPlaintextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, this.password, (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

const User = new mongoose.model("User", UserSchema);

module.exports = { User };
