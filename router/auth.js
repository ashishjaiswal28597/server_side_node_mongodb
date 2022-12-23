const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/authenticate')

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from the server rotuer`);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please Fill the Field Properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //yaha pe
      await user.save();

      res.status(201).json({ message: "user registered successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });

    // console.log(userLogin)

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie('jwtoken', token,{
        expires:new Data(Date.now()+ 25892000000),
        httpOnly:true
      })

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credientials" });
      } else {
        res.json({ message: "user signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// about us ka page

router.get("/about",authenticate , (req, res) => {
  console.log(`hellow my about`);
  res.send(req.rootUser);
});

// logout page

router.get("/logout", (req, res) => {
  console.log(`hellow my logout page`);
  res.clearCookie('jwtoken',{path : '/'})
  res.status(200).send('user logout');
});

module.exports = router;
