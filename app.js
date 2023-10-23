const express = require("express");
const cors = require("cors");
const app = express();
const methodOverride = require("method-override");

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride());

app.use(
  "/",
  express.Router().get("/", async (req, res) => {
    return res.status(200).json({ message: "Server up !" });
  })
);

app.use("/api", require("./routes/route"));
app.use((err, req, res, next) => {
  res.status(err.code).send(err);
});

module.exports = app;
