const { Transaction, Sequelize } = require("../models");

var transactionDao = {
  newTransaction: newTransaction,
  calculateTransaction: calculateTransaction,
};

async function newTransaction(data) {
  return Transaction.create(data);
}

async function calculateTransaction(start_date, end_date) {
  const result = await Transaction.sum("amount", {
    where: {
      date: {
        [Sequelize.Op.between]: [start_date, end_date],
      },
    },
  });
  return result;
}

module.exports = transactionDao;
