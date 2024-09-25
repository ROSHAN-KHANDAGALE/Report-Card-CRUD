const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const modelUser = require("../models/user.model");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  RECORD_NOT_FOUND,
  REGISTER_FAILED,
  RECORD_FOUND,
  REGISTERED,
  REMOVED,
} = require("../config/constants");

exports.getUser = async (req, res) => {
  try {
    const userFetch = await modelUser.find().sort({ name: 1 });
    res.status(OK).json({ message: RECORD_FOUND, user: userFetch });
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: NOT_FOUND });
  }
};

exports.createUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const user = new modelUser(req.body);
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new modelUser({ name, username, password: hashPass });

    await newUser.save();
    res.status(OK).json({ message: REGISTERED, record: newUser });
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: REGISTER_FAILED });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const removeID = await modelUser.findByIdAndDelete(req.params.id);
    if (!removeID) {
      res.status(BAD_REQUEST).json({ error: "No Record Found!!" });
    }
    res.json({ message: REMOVED, record: removeID });
  } catch (error) {
    res.status(NOT_FOUND).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await modelUser.findOne({ username }).select("password");

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ username, password }, "This_is_key : ", {
        expiresIn: "1h",
      });

      user.token = token;
      await user.save();

      return res.status(201).json({ msg: "Loged In", token: token });
    } else {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(401).json({ ERROR: error.message });
  }
};
