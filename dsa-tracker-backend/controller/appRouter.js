const express = require("express");
const modelData = require("../models/appModels");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const router = express.Router();

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
  const email = req.headers.email;
  const password = req.headers.password;
  const usersInfoModel = modelData["usersInfoModel"];
  await usersInfoModel
    .find({ email, password })
    .select("_id name email")
    .then((userInfo) => {
      const token = jwt.sign(
        {
          userId: userInfo[0]["_id"],
        },
        process.env.ACCESS_TOKEN
      );
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

module.exports = router;
