const router = require("express").Router();
const pool = require("../db");

const authorization = require("../middleware/authorization");

router.post("/create", authorization, async (req, res) => {
  try {
    const { name } = req.body;

    // create category group
    const catGrp = await pool.query(
      "insert into category_groups (name, user_id) values ($1, $2) returning *",
      [name, req.user]
    );

    res.json(catGrp.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// get unique (id, categoryGroupName) pairs for the user
router.get("/uniqueGroups", authorization, async (req, res) => {
  try {
    const unique = await pool.query(
      "select distinct id, name from (select id, name from category_groups where user_id = $1) as z where name <> 'Inflow'",
      [req.user]
    );
    res.json(unique.rows);
  } catch (err) {
    console.error("uniqueGroups", err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
