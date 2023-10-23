const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const roles = require("../constants/roles");
const { StatusCodes } = require("http-status-codes");
const API_MSG = require("../constants/api-message");

var authMiddleware = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  _extractToken: _extractToken,
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns error to build 401 http response || token extracted from headers
 *
 * exposed for testing purposes, marked as private by _
 */
function _extractToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== undefined) {
      // return token from string 'Bearer token'
      return authHeader.split(" ")[1];
    } else {
      throw {
        code: StatusCodes.UNAUTHORIZED,
        message: API_MSG.TOKEN_REQUIRED,
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

//Checks if the token is valid
function verifyToken(req, res, next) {
  try {
    const token = _extractToken(req, res, next);
    if (token) {
      jwt.verify(token, config.secret, (err) => {
        if (err) {
          throw {
            code: StatusCodes.UNAUTHORIZED,
            message: API_MSG.INVALID_TOKEN,
            data: null,
          };
        }
      });
      next();
    }
  } catch (error) {
    next(error);
  }
}

function isAdmin(req, res, next) {
  try {
    const token = _extractToken(req, res, next);
    if (token) {
      const decodedToken = jwt.verify(token, config.secret);
      const userRole = decodedToken.userRole;
      if (userRole === roles.ADMIN) {
        next();
      } else {
        throw {
          code: StatusCodes.UNAUTHORIZED,
          message: API_MSG.UNAUTHORIZED,
          data: null,
        };
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authMiddleware;
