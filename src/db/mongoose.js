//loading required libraies and files
const mongoose = require("mongoose");

//connecting to localdatabase of MongoDB using mongo db compass
mongoose.connect("mongodb://127.0.0.1:27017/addressBook-api", {
  useNewUrlParser: true,
});
