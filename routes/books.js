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

/*   GET all books   */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("books/index", { books, title: "Books" });
  })
);

/*  Create a new book form  */

router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("books/new-book", { title: "New Book" });
  })
);

/*   Create a new book    */

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    res.redirect("/books/" + book.id);
  })
);

/*    Updates book form     */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render("books/update-book", { book });
  })
);

/*    Updates  a book     */

router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect("/books/" + book.id);
  })
);

/*    Delete book form    */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render("books/update-book", { book });
  })
);

/*   Delete individual book    */

router.post(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/books")
  })
);

module.exports = router;
