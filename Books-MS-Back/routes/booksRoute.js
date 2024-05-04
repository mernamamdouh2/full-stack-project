const express = require('express');

const router = express.Router();
const { getBookValidator, createBookValidator, updateBookValidator, deleteBookValidator } = 
    require('../utils/validators/bookValidator');
const { getAllBooks, getOneBook, createBook, updateBook, deleteBook, 
    resizeImage, uploadBookImage } = require('../controllers/booksControllers'); //, uploadBookPDF, compressPDF 

router.route('/:year?')
    .get(getAllBooks)
    .post(uploadBookImage, resizeImage,  //uploadBookPDF, compressPDF 
        createBookValidator, createBook);
router.route('/:id')
    .get(getBookValidator, getOneBook)
    .put(uploadBookImage, resizeImage,
        updateBookValidator, updateBook)
    .delete(deleteBookValidator, deleteBook);

module.exports = router;