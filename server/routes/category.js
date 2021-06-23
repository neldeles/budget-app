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

// fetch current month's budget
router.get("/currentBudget", authorization, async (req, res) => {
  try {
    const currBudget = await pool.query(
      `select sum(budgeted_amount) as running_budgeted_amount from categories where is_default = true and user_id = $1`,
      [req.user]
    );

    res.json(currBudget.rows[0].running_budgeted_amount);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
