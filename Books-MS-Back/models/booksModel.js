const mongoose = require("mongoose");

//1- Create Schema
const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Book Title is Required"],
      unique: [true, "Book Title Already Exists"],
      minlength: [2, "Must be at least 2 chars"],
      maxlength: [32, "Must be at most 32 chars"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    author: {
      type: String,
      required: [true, "Book Author is required"],
      minlength: [2, "Must be at least 2 chars"],
      maxlength: [32, "Must be at most 32 chars"],
    },
    publishDate: {
      type: Date,
      required: [true, "Book Publish Date is required"],
      default: Date.now,
    },
    year: Number,
    description: {
      type: String,
      maxlength: [2000, "Must be at most 2000 chars"],
    },
    imageCover: String,
    // pdfDownload: String,
  },
  { timestamps: true }
);

booksSchema.index({ title: 1 });

const setImageUrl = (doc) => {
    if (doc.imageCover) {
        if (!doc.imageCover.startsWith("http")) {
            const imageCoverUrl = `${process.env.BASE_URL}/books/${doc.imageCover}`;
            doc.imageCover = imageCoverUrl;
        }
    }
};

// const setPDFUrl = (doc) => {
//     if (doc.pdfDownload) {
//         if (!doc.pdfDownload.startsWith('http')) {
//             const pdfDownloadUrl = `${process.env.BASE_URL}/pdfDownload/${doc.pdfDownload}`;
//             doc.pdfDownload = pdfDownloadUrl;
//         }
//     }
// };

booksSchema.post("init", (doc) => {
    setImageUrl(doc);
    // setPDFUrl(doc);
});

booksSchema.post("save", (doc) => {
    setImageUrl(doc);
    // setPDFUrl(doc);
});

//2- Create Model
const BooksModel = mongoose.model("Books", booksSchema);

module.exports = BooksModel;
