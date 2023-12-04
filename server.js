require("dotenv").config();
const express = require("express");
const app = express();

const db = require("./db");

const cors = require("cors");
const helmet = require("helmet");
const path = require('path');

app.use(cors());
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @path /api
 */
app.use("/api", require("./api"))

/**
 * @path /auth
 */
app.use("/auth", require("./auth"))

db.connect();

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`server up and running on port ${SERVER_PORT}`);
});
