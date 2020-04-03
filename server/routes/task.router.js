const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET ROUTE
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "todo" ORDER BY "username" DESC;`;
  pool
    .query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

// POST ROUTE
router.post("/", (req, res) => {
  const taskFromClient = req.body;
  const queryText = `INSERT INTO "todo" ("username", "task", "task_completed")
    VALUES ($1, $2, $3);`;

  pool
    .query(queryText, [
      taskFromClient.name,
      taskFromClient.task,
      taskFromClient.completed,
    ])
    .then((responseDb) => {
      console.log(responseDb);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
