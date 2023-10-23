const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const authMiddleware = require("../middleware/auth.middlware");

var authService = {
  signToken: signToken,
  roleUser: roleUser,
  idUser: idUser,
};

//Creation of token at login
function signToken(id, role) {
  let token = jwt.sign({ id: id, userRole: role }, config.secret, {
    expiresIn: "24h",
  });
  return token;
}

function roleUser(req, res) {
  try {
    const token = authMiddleware._extractToken(req);
    const decodedToken = jwt.verify(token, config.secret);
    let userRole = decodedToken.userRole;
    return userRole;
  } catch (error) {
    throw error;
  }
}

async function idUser(req, res) {
  try {
    const token = authMiddleware._extractToken(req);
    const decodedToken = jwt.verify(token, config.secret);
    let userid = decodedToken.id;
    return userid;
  } catch (error) {
    throw error;
  }
}

module.exports = authService;
