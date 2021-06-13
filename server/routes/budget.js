const router = require("express").Router();
const pool = require("../db");

const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const budget = await pool.query(
      `select 
        c.id as category_id, 
        c.name as category, 
        budgeted_amount, 
        cg.name as category_group 
        from categories as c 
        left join category_groups as cg on c.category_group_id = cg.id 
        where c.user_id = $1`,
      [req.user]
    );

    res.json(budget.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
