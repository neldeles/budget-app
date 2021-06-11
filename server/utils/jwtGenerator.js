const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id, expiry) {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: expiry });
}

module.exports = jwtGenerator;
