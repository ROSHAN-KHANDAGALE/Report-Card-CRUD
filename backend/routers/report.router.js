/**
 * Importing required packages
 */
const express = require("express");
const reportController = require("../controller/report.controller");
const router = express.Router();

/**
 * HTTP route declaration along with their methods
 */
router.get("/api/getReport", reportController.getReportDetails);
router.get("/api/getReport/:id", reportController.getReportDetailById);
router.post("/api/getReport", reportController.createReportDetails);
router.put("/api/getReport/:id", reportController.updateReportDetails);
router.delete("/api/getReport/:id", reportController.deleteReportDetails);

// Route for sending emails
router.post("/api/getReport/mail", reportController.mail);

/**
 * Exporting the router file
 */
module.exports = router;
