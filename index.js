const express = require("express");
const app = express();
const cors = require('cors')

require('dotenv').config()

const mongoose = require("mongoose");
// const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/comments");
const contactRoute = require('./routes/contact.routes')

app.use(cors())
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get('/', (req,res) => {
  res.send('We are home');
});



// app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);
app.use('/contact', contactRoute)

app.listen(process.env.PORT||4000, () => {
  console.log(`Backend is running`);
});
