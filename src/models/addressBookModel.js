//loading required libraies and files
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//Address Book Schema defined here
const addressBookSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  mobile: {
    type: Number,
    maxlength: 10,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
});

//this function used for what kind of data we show in response
addressBookSchema.methods.toJSON = function () {
  const address = this;
  const userProfile = address.toObject();
  delete userProfile.owner;

  return userProfile;
};

//here create model
const Address = mongoose.model("Address", addressBookSchema);
module.exports = Address;
