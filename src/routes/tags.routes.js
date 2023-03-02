const { Router } = require("express");

const TagsController = require("../controllers/tagsControllers");
const ensureAuthenticated= require("../middleware/ensureAuthenticated");

const tagsController = new TagsController;

const tagsRouter = Router();

tagsRouter.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;