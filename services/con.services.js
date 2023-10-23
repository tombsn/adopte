const cron = require("node-cron");
const userDao = require("../dao/user.dao");
const transactionDao = require("../dao/transaction.dao");
const payementService = require("./api-payment.services");

var cronService = {
  cronTask: cronTask,
};

function cronTask() {
  cron.schedule("0 0 * * *", async () => {
    const currentDate = new Date();
    const users = userDao.findAll();

    for (const user of users) {
      const lastPayment = await transactionDao.findOne({
        where: { UserId: user.id },
        order: [["date", "DESC"]],
      });

      if (lastPayment) {
        const daysDiff = Math.floor(
          (currentDate - lastPayment.date) / (1000 * 60 * 60 * 24)
        );

        if (daysDiff === user.type_subscription) {
          const newTransaction = {
            UserId: user.id,
            amount: lastPayment.amount,
            type_subscription: user.type_subscription,
            date: new Date(),
          };

          await transactionDao.create(newTransaction);

          await payementService.payment(user);
        }
      }
    }
  });
}

module.exports = cronService;
