const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// creating schema
const usersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a Email"],
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minNumber: 1,
            minUppercase: 1,
            minLowercase: 3,
            minSymbol: 1,
          }),
        message: "Password {VALUE} is not strong",
      },
    },
    avatar: {
      type: String,
    },

    confirmPassword: {
      type: String,
      required: [true, "Please Confirm Password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
      },
      message: "Password Don't Match",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      minLength: [3, "Name must be at least 10 character"],
      maxLength: [25, "Name is too large"],
      trim: true,
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please Provide a valid contact number",
      ],
    },

    shippingAddress: String,

    status: {
      type: String,
      enum: ["active", "deactive", "blocked"],
      default: "active",
    },
    passwordChangedAt: Date,
    passwordresetToken: String,
    passwordResetExpire: Date,
  },

  {
    timeStamps: true,
  }
);
// encrypt password
usersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    this.confirmPassword = undefined;
    next();
  } catch (error) {
    console.log(error);
  }
});

const user = mongoose.model("User", usersSchema);
module.exports = user;
