/**
 * Importing Mongoose Package for creating Schema in Mongo
 */
const mongoose = require("mongoose");

/**
 * Report Schema body structure
 */
const reportDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  marksEnglish: {
    type: Number,
    required: true,
  },

  marksScience: {
    type: Number,
    required: true,
  },

  marksMaths: {
    type: Number,
    required: true,
  },

  about: {
    type: String,
  },
});

/*
 * Inserting the Schema related information in the userDetails collection.
 */
const report = mongoose.model("reportDetails", reportDetailsSchema);

/**
 * Exporting the Mongoose Schema into the User for reference in the other files
 */
module.exports = report;
