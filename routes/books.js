const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

/* GET all books */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("books/index", { books, title: "Books" });
  })
);

/* Create a new book form */

router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("books/new-book", { title: "New Book" });
  })
);

/* Create a new book */

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/books/" + book.id);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        //checking the error
        book = await Book.build(req.body);
        res.render("books/new-book", { book, errors: error.errors });
      } else {
        //error caught in the asyncHandler's catch block
        throw error;
      }
    }
  })
);

/* Updates book form */

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("books/update-book", { book, title: "Edit Book" });
    } else {
      const err = new Error();
      err.status = 404;
      next(err);
    }
  })
);

/* Updates  a book */

router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
        res.redirect("/books/" + book.id);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        //checking the error re-rendering the update book view
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("books/update-book", {
          book,
          errors: error.errors,
          title: "Edit Book",
        });
      } else {
        //throws other types of errors which is handled by the catch block
        throw error;
      }
    }
  })
);

/* Delete individual book */

router.post(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.redirect("/books");
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
