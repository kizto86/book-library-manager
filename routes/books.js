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

/* GET all books. */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    if (books) {
      res.render("books/index", { books });
    } else {
      res.sendStatus(404);
    }
  })
);

/*GET individual book*/
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render("books/show", { book: book });
  })
);

module.exports = router;
