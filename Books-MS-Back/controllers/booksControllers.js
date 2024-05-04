// const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp"); // image processing lib for nodejs
const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const {
    uploadSingleImage,
    uploadSinglePDF,
} = require("../middlewares/imageUpload");
const BooksModel = require("../models/booksModel");
// const { PDFDocument } = require("pdf-lib");

// // upload single image
exports.uploadBookImage = uploadSingleImage("imageCover");

// Resize image
exports.resizeImage = asyncHandler(async (req, res, next) => {
    if (!req.file) return next();

    const ext = req.file.mimetype.split("/")[1];
    const filename = `book-${uuidv4()}-${Date.now()}.${ext}`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFile(`uploads/books/${filename}`); // write into a file on the disk

    req.body.imageCover = filename;
    next();
});

// Upload single PDF file
// exports.uploadBookPDF = uploadSinglePDF("pdfDownload");

// // Compress PDF file
// exports.compressPDF = async (pdfBuffer) => {
//     const filename = `bookPDF-${uuidv4()}-${Date.now()}.pdf`;

//     const pdfDoc = await PDFDocument.load(pdfBuffer);
//     const pages = pdfDoc.getPages();

//     // Compress each page in the PDF document
//     // eslint-disable-next-line no-restricted-syntax
//     for (const page of pages) {
//         const { width, height } = page.getSize();
//         page.setWidth(width * 0.8); // Example compression by 80% of original width
//         page.setHeight(height * 0.8); // Example compression by 80% of original height
//     }

//     const compressedPDFBuffer = await pdfDoc.save();
//     // Save the compressed PDF file to the uploads directory
//     fs.readFileSync(`uploads/pdfDownload/${filename}`, compressedPDFBuffer);
//     return { filename, compressedPDFBuffer };
// };


// @desc     Create Book
// @route    POST   /api/v1/books
// @access   public
exports.createBook = factory.createOne(BooksModel);

// @desc     Get All Books
// @route    GET   /api/v1/books/:year?   ==> /api/v1/books or /api/v1/books/:year
// @access   public
exports.getAllBooks = factory.getAll(BooksModel);

// @desc     Get One Book by id
// @route    GET   /api/v1/books/:id
// @access   public
exports.getOneBook = factory.getOne(BooksModel);

// @desc     Update Book
// @route    PUT   /api/v1/books/:id
// @access   public
exports.updateBook = factory.updateOne(BooksModel);

// @desc     Delete Book
// @route    DELETE   /api/v1/books/:id
// @access   public
exports.deleteBook = factory.deleteOne(BooksModel);
