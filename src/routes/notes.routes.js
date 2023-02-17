const { Router } = require("express");

const NotesController = require("../controllers/notesControllers");

const notesController = new NotesController;

const notesRouter = Router();

notesRouter.get("/", notesController.index);
notesRouter.post("/:user_id", notesController.create);
notesRouter.put("/:id", notesController.update);
notesRouter.get("/:id", notesController.show);
notesRouter.delete("/:id", notesController.delete);

module.exports = notesRouter;