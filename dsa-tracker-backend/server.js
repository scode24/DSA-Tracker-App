const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const appRouter = require("./controller/appRouter");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Routes
app.use(bodyParser.json());
app.use("/", appRouter);

// DB Connection
mongoose
  .connect(
    process.env.MONGO_DB_URL.replace(
      "<username>",
      process.env.MONGO_DB_USERNAME
    ).replace("<password>", process.env.MONGO_DB_PASSWORD),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((response) => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

// Server startup
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
