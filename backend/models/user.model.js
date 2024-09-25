/**
 * Importing Mongoose Package for creating Schema in Mongo
 */
const mongoose = require("mongoose");

/**
 * Report Schema body structure
 */
const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  token: {
    type: String,
    default: null,
  },
});

/*
 * Inserting the Schema related information in the UserDB collection.
 */
const user = mongoose.model("UserDB", userModel);

module.exports = user;
