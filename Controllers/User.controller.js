const User = require("../Models/User");
const {
  getUser,
  getSingleUser,
  updateUserById,
  createUser,
  getUserByEmail,
  updateUser,
} = require("../Services/user.service");
const { use } = require("../app");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/tokengenerate");
const { json } = require("express");
// GET
exports.getAllUser = async (req, res) => {
  try {
    const user = await getUser();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "cannot get data",
      error: error.message,
    });
  }
};

// GET SINGLE USER
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getSingleUser(id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "cannot get data",
      error: error.message,
    });
  }
};

// POST

exports.createUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    let users = await user.findOne({ email });
    if (users) {
      return res.status(401).json({
        status: "fail",
        error: "User Already exist",
      });
    }
    res.status(200).json({
      status: "success",
      message: "user signed up successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credential",
      });
    }
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not valid",
      });
    }
    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yet",
      });
    }
    // generate token
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "user signed up successfully",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// get me
exports.getMe = async (req, res, next) => {
  try {
    const user = await getUserByEmail(req.user?.email);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
// exports.createUser = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }
//     user = new User({
//         name,
//         email,
//         password
//       });
//      const users = new User(req.body)
//      const result =  await  users.save();
//     res.status(200).json({
//       status: "success",
//       message: "Data Inserted Sucessfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Data is not Inserted",
//       error: error.message,
//     });
//   }
// };

// user data update
exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.email;
    const updatedData = req.body;
    const user = await updateUserById(id, updatedData);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Data updated succesfully",
      data: user,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// exports.updateUserInfo = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await updateUser(id, req.body);
//     res.status(200).json({
//       status: "success",
//       message: "successfully updated",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Could not update the product",
//       error: error.message,
//     });
//   }
// };
