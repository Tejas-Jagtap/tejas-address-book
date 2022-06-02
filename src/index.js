//loading required libraies and files
const express = require("express");
require("./db/mongoose");
const addressBookRoter = require("./routers/addressBookRouter");
const userRouter = require("./routers/user");

//creating express server and defining port
const app = express();
const port = 3000;

//parsing incoming requests eith JSON payloads
app.use(express.json());

//using router file for routers
app.use(addressBookRoter);
app.use(userRouter);

//binding and listening on given host and port
app.listen(port, () => {
  console.log(`server is on ${port}`);
});
