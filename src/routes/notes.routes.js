const { Router } = require("express");

const NotesController = require("../controllers/notesControllers");
const ensureAuthenticated= require("../middleware/ensureAuthenticated");

const notesController = new NotesController;

const notesRouter = Router();

notesRouter.use(ensureAuthenticated);

notesRouter.get("/", notesController.index);
notesRouter.post("/", notesController.create);
notesRouter.put("/:id", notesController.update);
notesRouter.get("/:id", notesController.show);
notesRouter.delete("/:id", notesController.delete);

module.exports = notesRouter;