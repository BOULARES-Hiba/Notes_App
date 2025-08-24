import { Note } from "../../models/notes.js";

export const createNote = async (req, res) => {
   
  try {
    const { title, content, isPinned } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required" });
    }
    const note = new Note({
      title,
      content,
      isPinned: isPinned || false,
      user: req.user.id,
    });

    await note.save();
    return res.status(201).json({ success: true, data: note });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getNotes =  async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ isPinned: -1, createdAt: -1 });
    return res.json({ success: true, data: notes });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getNoteById =  async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });

    return res.json({ success: true, data: note });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, isPinned } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content, isPinned },
      { new: true }
    );

    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });

    return res.json({ success: true, data: note });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteNote =  async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!note)
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });

    return res.json({ success: true, message: "Note deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const togglePinNote = async (req, res) => {
  try {
  
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
     }
   
    note.isPinned = !note.isPinned;
    await note.save();

    return res.json({ success: true, data: note });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


