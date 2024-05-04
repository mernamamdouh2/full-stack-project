const slugify = require("slugify");
const { check, body } = require("express-validator");
const {
  validatorMiddleware,
} = require("../../middlewares/validatorMiddleware");

//check() => check body and params etc
exports.createBookValidator = [
  check("title")
    .isLength({ min: 2 })
    .withMessage("Must be at least 2 chars")
    .isLength({ max: 32 })
    .withMessage("Must be at most 32 chars")
    .notEmpty()
    .withMessage("Book Title is Required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("author")
    .notEmpty()
    .withMessage("Book Author is required")
    .isLength({ min: 2 })
    .withMessage("Must be at least 2 chars")
    .isLength({ max: 32 })
    .withMessage("Must be at most 32 chars"),

  check("publishDate")
    .isISO8601()
    .withMessage("Invalid Publish Date format. Must be in ISO8601 format")
    .notEmpty()
    .withMessage("Book Publish Date is required")
    .custom((value, { req }) => {
      const year = new Date(value).getFullYear();
      if (year < 1900 || year > new Date().getFullYear()) {
        throw new Error("Invalid year for Publish Date");
      }
      req.body.year = year;
      return true;
    }),

  check("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Must be at most 2000 chars"),

  check("imageCover").optional(),

  // check("pdfDownload").optional(),

  validatorMiddleware,
];

exports.getBookValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];


exports.updateBookValidator = [
  check("id").isMongoId().withMessage("Invalid Book ID format"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteBookValidator = [
  check("id").isMongoId().withMessage("Invalid Book ID format"),
  validatorMiddleware,
];
