const mongoose = require("mongoose");
const { DBURL } = require("./constants");

mongoose.connect(DBURL);
const db = mongoose.connection;

db.on("error", console.error.bind("Conection Failed between DB Server"));
db.once("open", () => {
  console.log("DB Server is connected.....");
});

module.exports = db;
