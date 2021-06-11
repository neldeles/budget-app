const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

// registering
router.post("/register", async (req, res) => {
  try {
    // We send post req with body containing name, email, password which we destructure
    const { name, email, password } = req.body;

    // 2. check if user exists
    const user = await pool.query("select * from users where email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("user already exists.");
    }

    // 3. bcrypt the password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user inside database
    const newUser = await pool.query(
      "insert into users (name, email, password) values ($1, $2, $3) returning *",
      [name, email, bcryptPassword]
    );

    // 5. generating our jwt token
    const token = jwtGenerator(newUser.rows[0].id, "1hr");

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const errorMessage = "password or email is incorrect";
    // 1. Destructure the request body
    const { email, password, isRemembered } = req.body;

    // 2. check if user doesn't exist
    const user = await pool.query("select * from users where email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send(errorMessage);
    }

    // 3. check if incoming pw is same as db pw
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json(errorMessage);
    }

    // 4. give them the jwt token
    if (isRemembered) {
      const token = jwtGenerator(user.rows[0].id, "30d");
      console.log("cookie set to 30 days");
      res.json({ token });
    } else {
      const token = jwtGenerator(user.rows[0].id, "1hr");
      console.log("cookie set to 1 hour");
      res.json({ token });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
