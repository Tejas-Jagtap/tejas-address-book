//loading required libraies and files
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//user Schema defined here
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password must be given format");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("address", {
  ref: "Address",
  localField: "_id",
  foreignField: "owner",
});

//this function used for what kind of data we show in response
userSchema.methods.toJSON = function () {
  const user = this;
  const userProfile = user.toObject();
  delete userProfile.password;
  delete userProfile.tokens;

  return userProfile;
};

//this function used to find user by their email,password
userSchema.statics.findBydetails = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  if (password != user.password) {
    throw new Error("Unable to login");
  }

  return user;
};

//this function used for generating tokens
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "assignment");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//here create model
const Users = mongoose.model("User", userSchema);

module.exports = Users;
