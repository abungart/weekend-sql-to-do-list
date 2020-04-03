const pg = require("pg");
const Pool = pg.Pool;

// Configuring pool connection
const pool = new Pool({
  database: "weekend-to-do-app",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMills: 30000,
});

pool.on("connect", () => {
  console.log("Connected to pool");
});

pool.on("error", (error) => {
  console.log("Error with pool: ", error);
});

module.exports = pool;
