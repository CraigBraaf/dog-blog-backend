const express = require('express')
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')
const getUser = require('../middleware/finders')

//GET ALL
router.get('/', async (req, res) => {
  try{ 
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).send({ msg: err.msg })
  }
})

//REGISTER (works)
router.post("/register", async (req, res) => {
  const {username, email, password} = req.body
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    
    const user = new User({
      username,
      email,
      password: hashedPass,
    });

    const newUser = await user.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Your signup was successful`,
      text: `thank you, ${username} for registering with us!`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      } 
    })
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     !user && res.status(400).json("Incorrect Username!");

//     const validated = await bcrypt.compare(req.body.password, user.password);
//     !validated && res.status(400).json("Incorrect Password!");

//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (!user) res.status(404).json({ message: "Could not find user" });
  if (await bcrypt.compare(password, user.password)) {
      try {
      const access_token = jwt.sign(
          JSON.stringify(user),
          process.env.ACCESSTOKEN
      );
      res.status(201).json({ jwt: access_token });
      } catch (error) {
      res.status(500).json({ message: error.message });
      }
  } else {
      res.status(400).json({ message: "Email and password combination do not match" });
  }
});


//UPDATE
router.put("/:id", getUser, async (req, res) => {
  const { username, password } = req.body;
if (username) res.user.name = username;
if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    res.user.password = hashedPassword;
}

try {
    const updatedUser = await res.user.save();
    res.status(201).send(updatedUser);
} catch (error) {
    res.status(400).json({ message: error.message });
}
});


//DELETE
router.delete("/:id", getUser, async (req, res) => {
  const { name, email } = res.user
  try {
    await res.user.remove();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL,
         pass: process.env.PASS
      }
    });
    const mailOptions = {
      from: 'braafcraig@gmail.com',
      to: 'braafcraig@gmail.com',
      subject: `${name} wants to contact you`,
      text: `${message} contact them at ${email}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      } 
    })
          res.json({ message: `Thank you ${name}, your message was sent` })
          } catch (err) {
          res.status(500).json({ message: err.message })
          }
    });


//GET USER (works)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router
