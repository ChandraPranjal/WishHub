const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    //No need to validate, because we aren't create new doc
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.email || !req.body.password || !req.body.role)
      throw new Error("All fields are required");
    const { email, password, role } = req.body;
    const ExistingUser = await User.findOne({ email });

    if (ExistingUser) throw new Error("User with same email already Exists");

    //req.files is provided by  multer
    // const profilePhotoLocalPath = req.files?.profilePhoto[0]?.path;
    // const profilePhoto = await uploadOnCloudiary(profilePhotoLocalPath);

    const user = new User({
      email,
      password,
      role,
      // profilePhoto: profilePhoto?.url || "",
    });
    await user.save();
    const createdUser = await User.findOne(
      { email },
      "-refreshToken  -password"
    );

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user.id
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options);
    res.status(201).json(createdUser);

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, role } = req.body;
    if (!email || !password) throw new Error("All fields are required");

    const user = await User.findOne({ email });
    if (!user) throw new Error("No user Found");

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) throw new Error("Password or Email is incorrect");

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user.id
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    const loggedInUser = await User.findOne(
      { email },
      "-refreshToken -password"
    );

    res
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options);
    res.status(200).json(loggedInUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const logoutUser = async (req, res) => {
  User.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json("user logged out");
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) throw new Error("Unauthorised request");

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?.id);
    if (!user) throw new Error("Invalid Refresh Token");

    if (incomingRefreshToken !== user?.refreshToken)
      throw new Error("Invalid Refresh Token");

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user.id
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json("Access Token refreshed");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { createUser, loginUser, logoutUser, refreshAccessToken };
