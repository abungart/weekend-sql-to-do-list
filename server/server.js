const express = require("express");
const bodyParser = require("body-parser");
const taskRouter = require("./routes/task.router");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// STATIC FILE SETUP
app.use(express.static("server/public"));

// Setting up routes
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
});
