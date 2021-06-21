const router = require("express").Router();
const pool = require("../db");

const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    // TODO: filter transactions based on date key
    const budget = await pool.query(
      `select 
        c.id, 
        c.name as name, 
        budgeted_amount, 
        cg.id as category_group_id,
        cg.name as category_group_name 
        from category_groups as cg 
        inner join categories as c on c.category_group_id = cg.id 
        where cg.user_id = $1`,
      [req.user]
    );

    res.json(budget.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
