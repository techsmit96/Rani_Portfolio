const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const routerMapping = require("./routes/routeMapping");

app.use("/api", routerMapping);

app.use(express.static(path.resolve("./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./frontend/build/index.html"));
});

module.exports = app;
