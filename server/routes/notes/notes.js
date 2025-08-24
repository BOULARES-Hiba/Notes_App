import express from "express";

import { authMiddleware } from "../../controllers/auth/authController.js";
import {   createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  togglePinNote } from "../../controllers/notes/noteControllers.js";

const notesRouter = express.Router();

notesRouter.post("/", authMiddleware,createNote)
notesRouter.get("/", authMiddleware, getNotes)
notesRouter.get("/:id", authMiddleware, getNoteById)
notesRouter.put("/:id", authMiddleware,updateNote)
notesRouter.delete("/:id", authMiddleware,deleteNote)
notesRouter.patch("/:id/pin", authMiddleware, togglePinNote)
export default notesRouter ;