var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const passport = require("passport");

const { default: mongoose } = require("mongoose");

var authRouter = require("./routes/auth/router");
var productsRouter = require("./routes/product/router");
var categoriesRouter = require("./routes/category/router");
var suppliersRouter = require("./routes/supplier/router");
var employeesRouter = require("./routes/employee/router");
var customersRouter = require("./routes/customer/router");
var ordersRouter = require("./routes/order/router");
var questionsRouter = require("./routes/questions/router");
const { CONNECTION_STRING, DB_NAME } = require("./constant/db");
const {
  passportVerifyToken, // USING
  passportVerifyAccount,
  passportConfigBasic,
} = require("./middlewares/passport");

var app = express();

// mongoose.connect("mongodb://localhost:27017/node-33-database");

mongoose.connect(`${CONNECTION_STRING}${DB_NAME}`);

passport.use(passportVerifyToken);
passport.use(passportVerifyAccount);
passport.use(passportConfigBasic);

// view engine setup
// server rendering, trả về html thay vì chuỗi json
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use(
  "/products",
  passport.authenticate("jwt", { session: false }),
  productsRouter
);
app.use(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  categoriesRouter
);
app.use(
  "/suppliers",
  passport.authenticate("jwt", { session: false }),
  suppliersRouter
);
app.use(
  "/employees",
  passport.authenticate("jwt", { session: false }),
  employeesRouter
);
app.use(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  ordersRouter
);
app.use(
  "/customers",
  passport.authenticate("jwt", { session: false }),
  customersRouter
);
app.use(
  "/questions",
  passport.authenticate("jwt", { session: false }),
  questionsRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
