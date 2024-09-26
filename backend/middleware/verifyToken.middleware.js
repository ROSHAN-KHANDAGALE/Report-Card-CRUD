const jwt = require("jsonwebtoken");
const { FORBIDDEN, ACCESS_DENIED } = require("../config/constants");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(FORBIDDEN).json({ message: ACCESS_DENIED });
    }

    const verified = jwt.verify(token, "This_is_key : ");
    console.log(verified);

    if (!verified) {
      return res.status(404).json({ msg: "Access Denied" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = verifyToken;
