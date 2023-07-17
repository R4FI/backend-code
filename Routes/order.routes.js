const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/Order.controller");
const verifyMiddlewire = require("../Middlewire/verifyMiddlewire");
const auth = require("../Middlewire/auth");

router
  .route("/")
  .post(verifyMiddlewire, auth("user"), orderController.placedOrder)
  .get(orderController.getAllOrder);

router.route("/my-orders").get(orderController.getMyOrder);

router
  .route("/:id")
  .delete(verifyMiddlewire, auth("user"), orderController.deleteOrders)
  .put(orderController.updateStatus);
module.exports = router;

// verifyMiddlewire,auth('User'),
