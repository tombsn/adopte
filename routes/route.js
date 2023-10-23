const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const transactionRoutes = require("./transaction.route");

router.use("/user", userRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;
