const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./App/Models");

const PORT = process.env.PORT;

const app = express();

let corsOptions = {
  origin: "http://localhost:8081/",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to the DB !!");
  })
  .catch((err) => {
    console.log(err);
  });

require("./App/Routes/user.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
