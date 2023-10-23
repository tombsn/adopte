const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");
const auth = require("../middleware/auth.middlware");

/** Common routes*/
//New transcation
router.post("/", auth.verifyToken, transactionController.newTransaction);

/** Admin routes */
router.get(
  "/total-sum",
  auth.verifyToken,
  auth.isAdmin,
  transactionController.calculteTotalTransaction
);

module.exports = router;
