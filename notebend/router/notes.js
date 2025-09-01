const express = require("express");
const { Authorization } = require("../Auth/Authorization");
const {
    addNotes,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    pinToggle,
    archiveToggle
} = require("../controller/nodesController");

const router = express.Router();

router.post("/addNotes/:userId", Authorization, addNotes);
router.get("/getAllNotes/:userId", Authorization, getAllNotes);
router.get("/getById/:userId/:noteId", Authorization, getNoteById);
router.put("/updateOneNote/:userId/:noteId", Authorization, updateNote);
router.delete("/deleteOneNote/:userId/:noteId", Authorization, deleteNote);
router.patch("/pinToggle/:userId/:noteId", Authorization, pinToggle);
router.patch("/archiveToggle/:userId/:noteId", Authorization, archiveToggle);

module.exports = router;
