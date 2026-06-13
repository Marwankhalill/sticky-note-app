import { Router } from "express";
import {
  addNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "./note.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const noteRouter = Router();

noteRouter.use(verifyToken);
noteRouter.post("/", addNote);
noteRouter.get("/", getAllNotes);
noteRouter.put("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;
