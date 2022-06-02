//loading required libraies and files
const express = require("express");
const router = express.Router();
const Address = require("../models/addressBookModel");
const auth = require("../middleware/auth");

//route for creating single contact
router.post("/contact", auth, async (req, res) => {
  const address = new Address({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await address.save();
    res.status(201).send(address);
  } catch (e) {
    res.status(400).send(e);
  }
});

//route for creating bulk contact
router.post("/contacts", auth, async (req, res) => {
  try {
    const address = req.body;
    address.forEach(async (addr) => {
      await Address.insertMany({ ...addr, owner: req.user._id });
    });
    res.status(200).send(address);
  } catch (e) {
    res.status(400).send(e);
  }
});

//route for fetching single contact
router.get("/contact/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const address = await Address.findById(_id);
    if (!address) {
      return res.status(404).send({ error: "Address not Found" });
    }
    res.status(200).send(address);
  } catch (e) {
    res.status(500).send(e);
  }
});

//route for phase matching result, here phase is "name"
router.get("/contact/phase/:phase", async (req, res) => {
  const phase = req.params.phase;
  console.log(phase);
  try {
    const address = await Address.find({ name: phase.toString() });
    if (!address) {
      return res.status(404).send({ error: "Address not Found" });
    }
    res.status(200).send(address);
  } catch (e) {
    res.status(500).send(e);
  }
});

//route for fetching contacts with pagination
router.get("/contact", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const address = await Address.find({}).limit(limit).skip(skip);
    res.status(200).send(address);
  } catch (e) {
    res.status(400).send();
  }
});

//route for updating given contact
router.patch("/contact/:id", auth, async (req, res) => {
  const allowedUpdates = ["name", "mobile", "address", "email"];
  const updates = Object.keys(req.body);

  const isvalidUpdate = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isvalidUpdate) {
    return res.status(400).send({ error: "Invalid Update!" });
  }

  try {
    const address = await Address.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!address) {
      return res.status(404).send();
    }

    updates.forEach((update) => (address[update] = req.body[update]));
    await address.save();
    res.status(200).send(address);
  } catch (e) {
    res.status(500).send();
  }
});

//route for deleting given contact
router.delete("/contact/:id", auth, async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!address) {
      return res.status(404).send();
    }
    res.status(200).send(address);
  } catch (e) {
    res.status(500).send();
  }
});

//get user token
router.get("/token", auth, async (req, res) => {
  try {
    const userToken = req.token;
    res.status(200).send({ userToken });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
