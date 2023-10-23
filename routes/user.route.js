const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middlware");

/** Common routes*/
//Login
router.post("/auth/login", userController.loginUser);

//Logout
router.post("/logout", auth.verifyToken, userController.logoutUser);

//Add User
router.post("/", userController.addUser);

router.delete("/:id", auth.verifyToken, userController.deleteUserById);

/** Admin routes */
//Get all users
router.get("/", auth.verifyToken, auth.isAdmin, userController.findUsers);

//Get by id
router.get("/:id", auth.verifyToken, auth.isAdmin, userController.findUserById);

//Update user
router.put("/:id", auth.verifyToken, auth.isAdmin, userController.updateUser);

//Delete user
module.exports = router;
