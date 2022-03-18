// const router = require("express").Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// //REGISTER
// router.post("/register", async (req, res) => {
//   const {username, email, password} = req.body
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(password, salt);
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPass,
//     });

//     const user = await newUser.save();
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'braafcraig@gmail.com',
//         pass: 'amkck005'
//       }
//     });
    
//     const mailOptions = {
//       from: 'braafcraig@gmail.com',
//       to: email,
//       subject: `Your signup was successfull`,
//       text: `thank you, ${username} for registering with us!`
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       } 
//     })
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //LOGIN
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

// module.exports = router;
