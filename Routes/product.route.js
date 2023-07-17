const express = require("express");
const router = express.Router();
const productController = require("../Controllers/Product.controller");
const verifyMiddlewire = require("../Middlewire/verifyMiddlewire");
const auth = require("../Middlewire/auth");

router
  .route("/")
  .post(productController.createProducts)
  .get(productController.getProducts);

router.route("/").delete(productController.deleteProducts);

// bulk update
router.route("/bulk-update").patch(productController.bulkupdateProducts);

router
  .route("/:id")
  .get(productController.singleProductGet)
  .patch(productController.updateProducts)
  .delete(productController.deleteProducts);

// verifyMiddlewire,auth('admin'),

module.exports = router;
