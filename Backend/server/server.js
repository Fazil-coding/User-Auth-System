require("dotenv").config();
require("../database/db");
const express = require("express");
const Users = require("../database/models/signinSchema");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signinSchema, signupSchema } = require("../validation/validation");
const app = express();

app.use(cors());
app.use(express.json());

{
  /* Sign-up Backend */
}
app.post("/signup", async (req, res) => {
  try {
    const parsed = signupSchema.parse(req.body);
    const { FirstName, EmailId, Password } = parsed;
    if (!FirstName || !EmailId || !Password) {
      return res.json({
        msg: "All fields are required to fill",
      });
    }
    const hashPassword = await bcrypt.hash(Password, 10);
    const userEmailId = await Users.findOne({ EmailId: EmailId });

    if (userEmailId) {
      return res.json({
        msg: "Users is already exists",
      });
    }
    const newUser = new Users({
      FirstName,
      EmailId,
      Password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      msg: "User is created",
      userInfo: newUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error while craeting User",
      Error: error.message,
    });
  }
});

{
  /* Sign-in Backend */
}
app.post("/signin", async (req, res) => {
  try {
    const parsed = signinSchema.parse(req.body);
    const { EmailId, Password } = parsed;
    const userExist = await Users.findOne({ EmailId: EmailId });
    if (!userExist) {
      return res.json({
        msg: "User not found",
      });
    }
    const pass = await bcrypt.compare(Password, userExist.Password);
    if (!pass) {
      return res.json({
        msg: "Password is Not matching",
      });
    }
    const token = jwt.sign(
      {
        id: userExist._id,
        email: userExist.EmailId,
        FirstName: userExist.FirstName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: userExist._id,
        FirstName: userExist.FirstName,
        EmailId: userExist.EmailId,
      },
    });
  } catch (error) {
    console.log("Error while login " + error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running... " + process.env.PORT);
});
