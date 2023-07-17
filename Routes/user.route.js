const express = require("express");
const userController = require("../Controllers/User.controller");
const verifyMiddlewire = require("../Middlewire/verifyMiddlewire");
const router = express.Router();

// routes
router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUser);

router.route("/login").post(userController.loginUser);

router.route("/me").get(verifyMiddlewire, userController.getMe);

router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser);

module.exports = router;
