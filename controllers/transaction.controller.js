const { StatusCodes } = require("http-status-codes");
const transactionDao = require("../dao/transaction.dao");
const { createHttpResponse } = require("../utils/custom-http-response");
const authService = require("../services/auth.services");

var transactionController = {
  newTransaction: newTransaction,
  calculteTotalTransaction: calculteTotalTransaction,
};

async function newTransaction(req, res, next) {
  let id = await authService.idUser(req);
  let transactionInfo = {
    UserId: id,
    amount: req.body.amount,
    type_subscription: req.body.type_subscription,
    date: new Date(),
  };
  try {
    let data = await transactionDao.newTransaction(transactionInfo);
    if (!(data instanceof Error)) {
      createHttpResponse(res, StatusCodes.CREATED, data);
    }
  } catch (error) {
    next({
      code: StatusCodes.BAD_REQUEST,
      message: "Failed",
      data: error.message,
    });
  }
}

async function calculteTotalTransaction(req, res, next) {
  let start_date = new Date(req.body.start_date).toISOString();
  let end_date = new Date(req.body.end_date).toISOString();
  try {
    let sum = await transactionDao.calculateTransaction(start_date, end_date);
    if (!(sum === null)) {
      createHttpResponse(res, StatusCodes.ACCEPTED, sum);
    }
  } catch (error) {
    next({
      code: StatusCodes.BAD_REQUEST,
      message: "Failed",
      data: error.message,
    });
  }
}

module.exports = transactionController;
