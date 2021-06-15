const router = require("express").Router();
const pool = require("../db");

const authorization = require("../middleware/authorization");

router.post("/create", authorization, async (req, res) => {
  try {
    const { user_id, name } = req.body;

    // reject if category group already exists
    const hasCatGrp = await pool.query(
      "select * from category_group where name = $1",
      [name]
    );

    if (hasCatGrp.rows.length !== 0) {
      return res.status(401).json("Category group name already exists.");
    }

    // create category group
    const catGrp = await pool.query(
      "insert into category_group (name) values ($1) returning *",
      [name]
    );

    console.log(catGrp);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
