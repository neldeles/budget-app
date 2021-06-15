const router = require("express").Router();
const pool = require("../db");

const authorization = require("../middleware/authorization");

router.post("/create", authorization, async (req, res) => {
  try {
    const { user_id, name, date } = req.body;

    const category = await pool.query(
      "insert into categories (user_id, name, budgeted_date) values ($1, $2, $3) returning *",
      [user_id, name, date]
    );

    console.log(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
