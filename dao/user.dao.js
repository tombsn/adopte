const { User, Transaction } = require("../models");

var userDao = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateById: updateById,
  findByEmail: findByEmail,
};

/**
 * @returns [User] or [] if no users found
 */
async function findAll() {
  return await User.findAll({ include: Transaction });
}

/**
 *
 * @param {number} id
 * @returns user || null
 */
async function findById(id) {
  return await User.findByPk(id);
}

/**
 *
 * @param {number} id
 * @returns 1 if user has been deleted || 0
 */
async function deleteById(id) {
  return await User.destroy({ where: { id: id } });
}

/**
 *
 * @param {User} user
 * @param {string} role
 * @returns User || sequelize error
 */
async function create(user) {
  try {
    let newUser = await User.create(user);
    return newUser;
  } catch (error) {
    return error;
  }
}

/**
 * @param {number} id
 * @param {User} user
 * @returns
 *
 * [1] if the record has been updated
 *
 * [0] if nothing happened e.g id doesn't exists, user is the same etc.
 */
async function updateById(id, user) {
  return await User.update(user, { where: { id: id } });
}

/**
 * @param {string} email
 * @returns User || null
 */
async function findByEmail(email) {
  return await User.findOne({ where: { email: email } });
}

module.exports = userDao;
