const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const config = require("./config");
const routes = require("./routes");

// database
mongoose.Promise = global.Promise;
mongoose.set("debug", config.IS_PRODUCTION);
mongoose.connection
  .on("error", error => console.log(error))
  .on("close,", () => console.log("Database connection closed."))
  .once("open", () => {
    const info = mongoose.connection;
    console.log(`Conneted to ${info.host}:${info.port} / ${info.name}`);
  });

mongoose.connect(config.MONGO_URL);

//express
const app = express();

//sessions
app.use(
  session({
    secret: config.SESSION_SECRET,
    resolve: true,
    saveUnitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

//sets and used
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//routers
app.get("/", function(req, res) {
  const id = req.session.userID;
  const login = req.session.userLogin;
  res.render("index", {
    user: {
      id,
      login
    }
  });
});

app.get("/register", function(req, res) {
  const id = req.session.userID;
  const login = req.session.userLogin;
  res.render("register", {
    user: {
      id,
      login
    }
  });
});

app.use("/api/auth", routes.auth);
app.use("/post", routes.post);
app.use("/users", routes.users);

//catch 404
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//error handler
//eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {}
  });
});

//  res.render("index", { arr: arr });});

app.listen(config.PORT, function() {
  console.log(`Example app listening on port ${config.PORT}`);
});
