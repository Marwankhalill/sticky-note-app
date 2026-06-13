import { Note } from "../../../database/models/note.model.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";

const addNote = catchError(async (req, res) => {
  let note = await Note.insertMany(req.body);
  res.status(201).json({ message: "success", note });
});

const getAllNotes = catchError(async (req, res) => {
  let notes = await Note.find({ user: req.user.userId });
  res.status(200).json({ message: "success", notes });
});

const updateNote = catchError(async (req, res) => {
  let note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "success", note });
});
const deleteNote = catchError(async (req, res, next) => {
  let note = await Note.findByIdAndDelete(req.params.id, req.body);
  // if (!note) res.status(404).json({ message: "Note not found" });
  if (!note) next(new AppError("Note not found", 404));

  res.status(200).json({ message: "success", note });
});

export { addNote, getAllNotes, updateNote, deleteNote };
