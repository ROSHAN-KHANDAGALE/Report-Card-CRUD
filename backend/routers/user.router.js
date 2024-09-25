/**
 * Importing required packages
 */
const express = require("express");
const userController = require("../controller/users.controller");
const router = express.Router();

/**
 * HTTP route declaration along with their methods
 */

// For User Creation and Viewing
router.get("/api", userController.getUser);
router.post("/api", userController.createUser);
router.delete("/api/:id", userController.deleteUser);

// For Login
router.post("/api/login", userController.loginUser);

module.exports = router;
