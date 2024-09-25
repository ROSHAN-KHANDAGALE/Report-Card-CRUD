/**
 * Importing required packages
 */
const express = require("express");
const reportController = require("../controller/report.controller");
const verifyToken = require("../middleware/verifyToken.middleware");
const router = express.Router();

/**
 * HTTP route declaration along with their methods
 */
router.get("/api/getReport", verifyToken, reportController.getReportDetails);
// console.log(verifyToken);
router.get(
  "/api/getReport/:id",
  verifyToken,
  reportController.getReportDetailById
);
router.post(
  "/api/getReport",
  verifyToken,
  reportController.createReportDetails
);
router.put(
  "/api/getReport/:id",
  verifyToken,
  reportController.updateReportDetails
);
router.delete(
  "/api/getReport/:id",
  verifyToken,
  reportController.deleteReportDetails
);

// Route for sending emails
router.post("/api/getReport/mail", reportController.mail);

/**
 * Exporting the router file
 */
module.exports = router;
