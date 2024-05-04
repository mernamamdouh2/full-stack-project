const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
require("colors");
const dotenv = require("dotenv");
const BooksModel = require("../../models/booksModel");
const dbConnection = require("../../config/database");

dotenv.config({ path: "../../config.env" });

// connect to DB
dbConnection();

// Read data
const books = JSON.parse(fs.readFileSync("./books.json"));

// Insert data into DB
const insertData = async () => {
  try {
    await BooksModel.create(books);
    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await BooksModel.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
