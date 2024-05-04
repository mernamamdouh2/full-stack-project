const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// 1- .then() .catch(err)
// 2- try{} catch(err)
// 3- asyncHandler(async) ==> express error handler
const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageCoverUrl = `${process.env.BASE_URL}/books/${doc.imageCover}`;
    doc.imageCover = imageCoverUrl;
  }
};

// const setPDFUrl = (doc) => {
//   if (doc.pdfDownload) {
//     const pdfDownloadUrl = `${process.env.BASE_URL}/pdfDownload/${doc.pdfDownload}`;
//     doc.pdfDownload = pdfDownloadUrl;
//   }
// };

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);

    if (newDoc.constructor.modelName === "BooksModel") {
      setImageUrl(newDoc);
      // setPDFUrl(newDoc);
    }
    res.status(201).json({ data: newDoc });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Build Query for all books
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .paginate(documentsCounts)
      .search()
      .limitFields();

    if (req.params.year) {
      const year = parseInt(req.params.year, 10);
      if (isNaN(year)) {
        return next(
          new ApiError("Invalid year. Please provide a valid year.", 400)
        );
      }
      // Modify query to filter books for the specific year
      apiFeatures.mongooseQuery.find({
        publishDate: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31),
        },
      });
    }

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    // Set Images url
    if (Model.collection.collectionName === "BooksModel") {
      documents.forEach((doc) => setImageUrl(doc));
      // documents.forEach((doc) => setPDFUrl(doc));
    }
    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Execute query
    const document = await Model.findById(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }

    if (document.constructor.modelName === "BooksModel") {
      setImageUrl(document);
      // setPDFUrl(document);
    }
    res.status(200).json({ data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document found for this id: ${req.params.id}`, 404)
      );
    }

    // To trigger 'save' event when update document
    const doc = await document.save();
    if (doc.constructor.modelName === "BooksModel") {
      setImageUrl(doc);
      // setPDFUrl(doc);
    }
    res.status(200).json({ data: doc });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      next(
        new ApiError(`No document found for this id: ${req.params.id}`, 404)
      );
    }
    // 204 no content
    res.status(204).send();
  });
