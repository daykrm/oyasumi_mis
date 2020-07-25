const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

let corsOptions = {
  origin: "http://localhost:8081/",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
