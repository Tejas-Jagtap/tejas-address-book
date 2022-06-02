//loading required libraies and files
const express = require("express");
const router = express.Router();
const User = require("../models/user");

//route for user registration
router.post("/users", async (req, res) => {
  user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// route for user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findBydetails(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
