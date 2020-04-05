const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET ROUTE
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "todo" ORDER BY "username" ASC;`;
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
      taskFromClient.complete,
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

// DELETE ROUTE
router.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  const queryText = `DELETE FROM "todo" WHERE "id" = $1;`;

  pool
    .query(queryText, [taskId])
    .then((responseDb) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error deleting song:", err);
      res.sendStatus(500);
    });
});

// PUT ROUTE
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const completeData = req.body;
  const queryText = `UPDATE "todo"
    SET "task_completed"=$1
    WHERE "id" = $2;`;

  pool
    .query(queryText, [completeData.complete, taskId])
    .then((responseDb) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error updating task:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
