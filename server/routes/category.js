const router = require("express").Router();
const pool = require("../db");

const authorization = require("../middleware/authorization");

router.post("/create", authorization, async (req, res) => {
  try {
    const { name, date, category_group_id } = req.body;

    // create category
    const category = await pool.query(
      "insert into categories (name, user_id, budgeted_date, category_group_id) values ($1, $2, $3, $4) returning *",
      [name, req.user, date, category_group_id]
    );

    res.json(category.rows[0]);
  } catch (err) {
    console.error("category /create route", err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
