const express = require("express")
const noteRouter = express.Router()

const {
    createNote,
    updateNote,
    deleteNote,
    getNotes
} = require("../controllers/noteController");
const auth = require("../middleware/auth");

noteRouter.get("/", auth, getNotes);

noteRouter.post("/", auth, createNote);

noteRouter.delete("/:id", auth, deleteNote);

noteRouter.put("/:id", auth, updateNote);

module.exports = noteRouter;