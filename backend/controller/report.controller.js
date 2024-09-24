const mongoose = require("mongoose");
const modelReport = require("../models/report.model");
const constants = require("../config/constants");
const { sendRegistrationEmail } = require("../helper/mail");

/**
 * To get User Report
 */
exports.getReportDetails = async (req, res) => {
  try {
    const reportFound = await modelReport.find().sort({ firstName: 1 });
    res
      .status(constants.OK)
      .json({ message: constants.RECORD_FOUND, report: reportFound });
  } catch (error) {
    res.status(constants.NOT_FOUND).json({ error: constants.RECORD_NOT_FOUND });
  }
};

/**
 * To get Record by ID
 */
exports.getReportDetailById = async (req, res) => {
  try {
    const reportFoundById = await modelReport.findById({ _id: req.params.id });
    res
      .status(constants.OK)
      .json({ message: constants.RECORD_FOUND, report: reportFoundById });
  } catch (error) {
    res.status(constants.NOT_FOUND).json({ error: constants.RECORD_NOT_FOUND });
  }
};

/**
 * To create Record
 */
exports.createReportDetails = async (req, res) => {
  try {
    const newReport = new modelReport(req.body);
    await newReport.save();

    // Send email after report is created
    await sendRegistrationEmail(
      newReport.email,
      newReport.firstName,
      newReport.lastName
    );

    res
      .status(constants.CREATED)
      .json({ message: constants.REGISTERED, report: newReport });
  } catch (error) {
    res
      .status(constants.BAD_REQUEST)
      .json({ error: constants.REGISTER_FAILED });
  }
};

/**
 * To update Record by ID
 */
exports.updateReportDetails = async (req, res) => {
  try {
    const updateReport = await modelReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateReport) {
      return res
        .status(constants.NOT_FOUND)
        .json({ error: constants.RECORD_NOT_FOUND });
    }
    res
      .status(constants.OK)
      .json({ message: constants.UPDATED, item: updateReport });
  } catch (error) {
    console.log(error);
    res.status(constants.NOT_FOUND).json({ error: constants.UPDATE_FAILED });
  }
};

/**
 * To delete Record by ID
 */
exports.deleteReportDetails = async (req, res) => {
  try {
    const deleteReport = await modelReport.findByIdAndDelete(req.params.id);
    if (!deleteReport) {
      return res
        .status(constants.NOT_FOUND)
        .json({ error: constants.REMOVE_FAIL });
    }
    res
      .status(constants.OK)
      .json({ message: constants.REMOVED, report: deleteReport });
  } catch (error) {
    res.status(constants.BAD_REQUEST).json({ error: constants.REMOVE_FAIL });
  }
};

/**
 * To send MAIL
 */
exports.mail = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    await sendRegistrationEmail(email, firstName, lastName);
    res.status(constants.OK).json({ message: constants.EMAIL_SENT });
  } catch (error) {
    console.error("Error in sending email:", error);
    res.status(constants.BAD_REQUEST).json({ error: error.message });
  }
};
