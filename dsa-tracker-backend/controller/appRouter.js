const express = require("express");
const modelData = require("../models/appModels");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const sendOtp = async (toMail, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.MAIL_AUTH_USER,
      to: toMail,
      subject: "DSA Tracker App : OTP for password reset",
      text: "OTP is " + otp,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return "mail sent";
  } catch (error) {
    throw new Error(error);
  }
};

const generateOtp = () => {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const otpSchema = new mongoose.Schema({
  email: String,
  otp: Number,
  createdAt: { type: Date, default: Date.now },
});

// Create a TTL index on the "createdAt" field with an expiration time of 24 hours
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 27 });

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Invalid or missing Authorization header");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send("Not valid user");
    }
    req.userId = decoded["userId"];
    req.name = decoded["name"];
    req.email = decoded["email"];
  });

  next();
};

router.get("/validate", auth, async (req, res) => {
  const usersInfoModel = modelData["usersInfoModel"];
  await usersInfoModel
    .find({ _id: req.userId })
    .select("_id name email")
    .then((userInfo) => {
      res.send(userInfo);
    })
    .catch((error) => {
      res.status(401).send(error);
    });
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const usersInfoModel = modelData["usersInfoModel"];
  await usersInfoModel
    .find({ email, password })
    .select("_id name email")
    .then((userInfo) => {
      let token = undefined;
      if (userInfo.length > 0) {
        token = jwt.sign(
          {
            userId: userInfo[0]["_id"],
            name: userInfo[0]["name"],
            email: userInfo["email"],
          },
          process.env.ACCESS_TOKEN
        );
      }
      const response = {
        token,
        userInfo,
      };
      res.send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.post("/register", async (req, res) => {
  const requestData = req.body;
  const email = requestData["email"];
  const usersInfoModel = modelData["usersInfoModel"];
  await usersInfoModel.find({ email }).then((userInfo) => {
    if (userInfo.length !== 0) {
      res.status(400).send("User with provided email id is already exist");
    } else {
      const newUser = new usersInfoModel({
        name: requestData["name"],
        email: requestData["email"],
        password: requestData["password"],
      });
      newUser
        .save()
        .then((data) => {
          res.send(
            "Registration is successful. Sign in with your email and password"
          );
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  });
});

router.post("/save", auth, async (req, res) => {
  const requestData = req.body;
  const entryModel = modelData["logEntryModel"];
  const newEntry = new entryModel({
    userId: req.userId,
    question: requestData["question"],
    link: requestData["link"],
    topic: requestData["topic"],
    complexity: requestData["complexity"],
    note: requestData["note"],
    status: requestData["status"],
  });

  await newEntry
    .save()
    .then((data) => {
      res.send("Data saved successfully");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/checkValidEmail", async (req, res) => {
  const email = req.headers.email;
  const userInfo = modelData["usersInfoModel"];
  await userInfo
    .find({ email: email })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.post("/update/:id", auth, async (req, res) => {
  const requestData = req.body;
  const entryModel = modelData["logEntryModel"];
  const updatedEntry = {
    question: requestData["question"],
    category: requestData["category"],
    notes: requestData["notes"],
    complexity: requestData["complexity"],
    status: requestData["status"],
  };
  const entryId = req.params.id;

  await entryModel
    .update({ _id: entryId, userId: req.userId }, updatedEntry, { new: true })
    .then((data) => {
      res.send("Data updated successfully");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.post("/resetPassword", async (req, res) => {
  const userModel = modelData["usersInfoModel"];
  userModel
    .updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } }
    )
    .then((data) => {
      res.send("Password has been changed successfully");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/delete/:id", auth, async (req, res) => {
  const entryModel = modelData["logEntryModel"];
  const entryId = req.params.id;

  entryModel
    .findByIdAndDelete(entryId)
    .then((data) => {
      res.send("Entry has been deleted successfully");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/fetchAllLog", auth, async (req, res) => {
  const entryModel = modelData["logEntryModel"];
  await entryModel
    .find({ userId: req.userId })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/search", auth, async (req, res) => {
  const searchValue = req.query.searchValue;
  const entryModel = modelData["logEntryModel"];
  await entryModel
    .find({
      $and: [
        {
          $or: [
            { question: { $regex: searchValue, $options: "i" } },
            { topic: { $regex: searchValue, $options: "i" } },
            { complexity: { $regex: searchValue, $options: "i" } },
            { note: { $regex: searchValue, $options: "i" } },
            { status: { $regex: searchValue, $options: "i" } },
          ],
        },
        { userId: req.userId },
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.post("/generateOtp", async (req, res) => {
  const otpModel = new mongoose.model("otp_data", otpSchema);
  const otp = generateOtp();

  await otpModel
    .deleteMany({ email: req.headers.email })
    .then(() => {
      otpModel
        .create({ email: req.headers.email, otp, createdAt: new Date() })
        .then((response) => {
          sendOtp(req.headers.email, otp).then((response) => {
            res.send(response);
          });
        });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/verifyOtp", async (req, res) => {
  const otpModel = new mongoose.model("otp_data", otpSchema);
  otpModel
    .find({ email: req.headers.email, otp: req.headers.otp })
    .then((response) => {
      if (response.length > 0) {
        res.send("verified");
      } else {
        res.send("not-verified");
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
