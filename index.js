require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "up and running", ...req.query });
});

app.post("/ping", (req, res) => {
  const id = req.body.id;
  if (id == "123") {
    return res
      .status(200)
      .json({ message: `hello ${req.body.name}`, ...req.headers });
  } else {
    return res.status(404).json({ message: "user not found" });
  }
});

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`server up and running on port ${SERVER_PORT}`);
});
