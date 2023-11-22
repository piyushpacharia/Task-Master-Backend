const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

//importing routes
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/Task");
const { isLoggedIn } = require("./middlewares/general");

//setting apps
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/task", isLoggedIn, taskRouter);
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error while connecting database", err.message));

app.listen(3001, () => console.log("server is running at 3001"));
