const userDao = require("../dao/user.dao");
const bcrypt = require("bcrypt");
const { createHttpResponse } = require("../utils/custom-http-response");
const { StatusCodes } = require("http-status-codes");
const authService = require("../services/auth.services");
const API_MSG = require("../constants/api-message");
const { USER_NOT_CONNECTED } = require("../constants/api-message");
const ROLE = require("../constants/roles");

var userController = {
  addUser: addUser,
  findUsers: findUsers,
  findUserById: findUserById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
  loginUser: loginUser,
  logoutUser: logoutUser,
};

//----------------------------Add User----------------------------//
async function addUser(req, res, next) {
  try {
    let user = req.body;
    if (user) {
      user.password = await bcrypt.hash(user.password, 10);
      user.role = ROLE.USER;
      user.cvv = user.cvv ? await bcrypt.hash(user.cvv, 10) : null;
      user.card_number = user.card_number
        ? await bcrypt.hash(user.card_number, 10)
        : null;
    }
    const data = await userDao.create(user);
    if (!(data instanceof Error)) {
      createHttpResponse(res, StatusCodes.CREATED, API_MSG.USER_CREATED, data);
    } else throw data;
  } catch (error) {
    next({
      code: StatusCodes.BAD_REQUEST,
      message: API_MSG.USER_CREATED_FAIL,
      data: error.message,
    });
  }
}

//----------------------------Find All Users----------------------------//
async function findUsers(req, res, next) {
  try {
    let users = await userDao.findAll();
    if (users.length > 0) {
      createHttpResponse(res, StatusCodes.OK, API_MSG.USERS_FOUND, users);
    } else {
      throw {
        code: StatusCodes.NOT_FOUND,
        message: API_MSG.USERS_NOT_FOUND,
        data: error.message,
      };
    }
  } catch (error) {
    next(error);
  }
}

//----------------------------Find User By Id----------------------------//
async function findUserById(req, res, next) {
  let id = parseInt(req.params.id);
  try {
    let user = await userDao.findById(id);
    if (user) {
      createHttpResponse(res, StatusCodes.OK, API_MSG.USER_FOUND, user);
    } else {
      throw {
        code: StatusCodes.NOT_FOUND,
        message: API_MSG.USER_NOT_FOUND,
        data: null,
      };
    }
  } catch (error) {
    next(error);
  }
}

//----------------------------Update User----------------------------//
async function updateUser(req, res, next) {
  let id = parseInt(req.params.id);
  let userDTO = req.body;
  if (userDTO.password) {
    userDTO.password = await bcrypt.hash(userDTO.password, 10);
  }
  try {
    let data = await userDao.updateById(id, userDTO);
    if (data[0] === 1) {
      // retrieve the user if update ok
      const user = await userDao.findById(id);
      createHttpResponse(res, StatusCodes.CREATED, API_MSG.USER_UPDATED, user);
    } else {
      throw {
        code: StatusCodes.BAD_REQUEST,
        message: API_MSG.USER_UPDATED_FAIL,
        data: null,
      };
    }
  } catch (error) {
    next(error);
  }
}

//----------------------------Delete User----------------------------//
async function deleteUserById(req, res, next) {
  let id = parseInt(req.params.id);

  try {
    const result = await userDao.deleteById(id);

    if (result === 1) {
      createHttpResponse(res, StatusCodes.OK, API_MSG.USER_DELETED, null);
    } else {
      throw {
        code: StatusCodes.NOT_FOUND,
        message: API_MSG.USER_DELETED_FAIL,
        data: error.message,
      };
    }
  } catch (error) {
    next(error);
  }
}

//----------------------------Login User----------------------------//
async function loginUser(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  try {
    const user = await userDao.findByEmail(email);
    if (!user) {
      throw {
        code: StatusCodes.UNAUTHORIZED,
        message: USER_NOT_FOUND,
        data: email,
      };
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw {
        code: StatusCodes.UNAUTHORIZED,
        message: API_MSG.INVALID_PASSWORD,
        data: null,
      };
    } else {
      let token = authService.signToken(user.id, user.role);
      res.setHeader("authorization", `${"Bearer " + token}`);
      createHttpResponse(res, StatusCodes.OK, API_MSG.USER_CONNECTED, {
        userId: user.id,
        token: token,
      });
    }
  } catch (error) {
    next(error);
  }
}

//----------------------------Logout User----------------------------//
async function logoutUser(req, res, next) {
  const newToken = "";
  try {
    if (req.headers && req.headers.authorization) {
      res.setHeader("authorization", `${newToken}`);
      createHttpResponse(res, StatusCodes.OK, API_MSG.USER_DECONNECTED);
    } else {
      throw {
        code: StatusCodes.BAD_REQUEST,
        message: USER_NOT_CONNECTED,
        data: error.message,
      };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = userController;
