const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const routerPath = require("./routers/report.router");
const userPath = require("./routers/user.router");
const constants = require("./config/constants");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/reportDetails", routerPath);
app.use("/user", userPath);

const PORT = constants.PORTNO;

console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
