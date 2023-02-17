const { Router } = require("express");

const TagsController = require("../controllers/tagsControllers");

const tagsController = new TagsController;

const tagsRouter = Router();

tagsRouter.get("/:user_id", tagsController.index);

module.exports = tagsRouter;