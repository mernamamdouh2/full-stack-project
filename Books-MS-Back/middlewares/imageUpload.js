const multer = require('multer');
const ApiError = require('../utils/apiError');

// Upload single image => method return multer middleware
exports.uploadSingleImage = (fieldName) => {
  // Storage
  const multerStorage = multer.memoryStorage();

  // Accept only images
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Not an image! Please upload only image', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.single(fieldName);
};

// // Upload single PDF file => method return multer middleware
// exports.uploadSinglePDF = (fieldName) => {
//   // Storage
//   const multerStorage = multer.memoryStorage();
//   // Accept only PDF files
//   const multerFilter = (req, file, cb) => {
//     console.log(file.mimetype);
//     if (file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new ApiError('Not a PDF file! Please upload only PDF files', 400), false);
//     }
//   };
//   const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
//   return upload.single(fieldName);
// };
