const Notes = require("../model/Notes");

// Add a new note
exports.addNotes = async (req, res) => {
    try {
        const { title, content, tags, isPinned, isArchived } = req.body;
        const { userId } = req.params;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required", status: "Failed" });
        }

        const notes = new Notes({
            userId,
            title,
            content,
            tags,
            isPinned,
            isArchived
        });

        await notes.save();

        res.status(201).json({ message: "Successfully added", status: "Success", note: notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: "Failed" });
    }
};

// Get all notes for a user
exports.getAllNotes = async (req, res) => {
    try {
        const { userId } = req.params;
        const notes = await Notes.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ notes, message: "All Notes are retrieved", status: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: "Failed" });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const { title, content, tags, isPinned, isArchived } = req.body;

        const note = await Notes.findOneAndUpdate(
            { _id: noteId, userId },
            { title, content, tags, isPinned, isArchived },
            { new: true }
        );

        if (!note) return res.status(404).json({ message: "Note not found", status: "Failed" });

        res.status(200).json({ note, message: "Successfully Updated", status: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: "Failed" });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const { userId, noteId } = req.params;

        const note = await Notes.findOneAndDelete({ _id: noteId, userId });
        if (!note) return res.status(404).json({ message: "Note not found", status: "Failed" });

        res.status(200).json({ message: "Deleted Successfully", status: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: "Failed" });
    }
};

exports.pinToggle = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const note = await Notes.findOne({ _id: noteId, userId });
        if (!note) return res.status(404).json({ message: "Note not found" });

        note.isPinned = !note.isPinned;
        await note.save();

        res.status(200).json({ message: `Note ${note.isPinned ? "pinned" : "unpinned"}`, note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.archiveToggle = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const note = await Notes.findOne({ _id: noteId, userId });
        if (!note) return res.status(404).json({ message: "Note not found" });

        note.isArchived = !note.isArchived;
        await note.save();

        res.status(200).json({ message: `Note ${note.isArchived ? "archived" : "unarchived"}`, note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const note = await Notes.findOne({ _id: noteId, userId });
        if (!note) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
