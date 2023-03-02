const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserController = require("../controllers/usersControllers");
const UserAvatarController = require("../controllers/usersAvatarControllers");
const ensureAuthenticated= require("../middleware/ensureAuthenticated");

const usersController = new UserController;
const usersAvatarController = new UserAvatarController;
const upload = multer(uploadConfig.MULTER);
const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);

module.exports = usersRouter;