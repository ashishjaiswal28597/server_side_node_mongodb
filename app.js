const mongoose = require("mongoose");
const express = require("express");
const cors =require('cors')
const dotenv = require("dotenv");
const app = express();
mongoose.set("strictQuery", true);

dotenv.config({ path: "./config.env" });

require('./db/conn')
// const User = require('./model/userSchema')
app.use(cors());
app.use(express.json())

app.use(require('./router/auth'));

const PORT = process.env.PORT;





// app.get("/about", (req, res) => {
//   console.log(`hellow my about`);
//   res.send(`Hello about the server`);
// });

app.get("/contact", (req, res) => {
  res.send(`Hello contact the server`);
});

app.get("/signin", (req, res) => {
  res.send(`Hello Login the server`);
});

app.get("/signup", (req, res) => {
  res.send(`Hello Registration the server`);
});

app.listen(PORT, () => {
  console.log(`server is runnig at port on ${PORT}`);
});
