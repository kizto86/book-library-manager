const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const booksRouter = require("./routes/books");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/books", booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render('books/page-not-found')
    next()
});

// Global error handler
app.use(function (err, req, res, next) {
  if(err){
    console.log('Global error handler called', err)
  }
  // render the error page
  if (err.status === 404) {
    res.status(404).render("books/page-not-found",{err});
  } else {
    err.message = err.message || `Oops it looks like something went wrong on the server`
    res.status(err.status || 500).render("error", { err });
  }
});

module.exports = app;
