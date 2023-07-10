const express = require("express");
const noteRouter = require("./routes/notesRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("HTTP Methods - ", req.method, "URL - ", req.url);
  next();
});

app.get("/", (req, res) => {
  res.json({
    msg: "welcome to notes api",
  });
});

app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("*", (req, res) => {
  res.status(200).json({
    message: "This is not a valid routes of NotesApi - Anubhav",
  });
});

const PORT = process.env.PORT || 5000;

const url =
  "mongodb+srv://king100rao:king100rao@cluster0.dxkkr.mongodb.net/notes_db?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`server is ready at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Sorry we cannot connect with database at the momemt");
  });
