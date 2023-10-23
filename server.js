require("dotenv").config({ path: "./.env" });

const app = require("./app");
const db = require("./models/index");
const PORT = process.env.PORT || 5000;
const cronService = require("./services/con.services");

startApp();

//Launching the application
async function startApp() {
  try {
    await initDatabase();
    startServer();
    cronService.cronTask();
  } catch (error) {
    console.log("Error : ", error.message);
  }
}

//Intinalising the database
async function initDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected");
    await db.sequelize.sync();
    console.log("Database syncronized");
  } catch (error) {
    throw error;
  }
}

//Launching the server
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
