"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.updateBookForm = exports.createBook = exports.createBookForm = exports.bookDetails = exports.readAllBooks = exports.getHomePage = void 0;
const uuid_1 = require("uuid");
const indexu_1 = require("../utils/indexu");
const getHomePage = (req, res, next) => {
    res.render("landingpage");
};
exports.getHomePage = getHomePage;
const readAllBooks = (req, res, next) => {
    let allbooksData = (0, indexu_1.getAllData)("database.json");
    res.render("homepage", { checkings: allbooksData });
};
exports.readAllBooks = readAllBooks;
const bookDetails = (req, res, next) => {
    let allbooksData = (0, indexu_1.getAllData)("database.json");
    const id = req.body.bookID;
    const currentBook = allbooksData.find((book) => book.id === id);
    res.render("viewbookdetail", { book: currentBook });
};
exports.bookDetails = bookDetails;
const createBookForm = (req, res, next) => {
    res.render("createbook");
};
exports.createBookForm = createBookForm;
const createBook = (req, res, next) => {
    const allbooksData = (0, indexu_1.getAllData)("database.json");
    const { title, author, datePublished, Description, pageCount, genre, publisher } = req.body;
    const existingBook = allbooksData.find((e) => e.Title === title);
    if (existingBook) {
        return res.send({
            message: `Book with the title ${title} already exists`
        });
    }
    const data = { "id": (0, uuid_1.v4)(), "Title": title, "Author": author, "datePublished": datePublished, "Description": Description, "pageCount": pageCount, "Genre": genre, "Publisher": publisher, "createdat": new Date(), "updatedat": new Date() };
    allbooksData.push(data);
    (0, indexu_1.createData)("database.json", allbooksData);
    res.redirect("/book/readAllBooks");
};
exports.createBook = createBook;
const updateBookForm = (req, res, next) => {
    const allbooksData = (0, indexu_1.getAllData)("database.json");
    const id = req.body.bookID;
    const currentBook = allbooksData.find((book) => book.id === id);
    res.render("editbook", { book: currentBook });
};
exports.updateBookForm = updateBookForm;
const updateBook = (req, res, next) => {
    try {
        const allbooksData = (0, indexu_1.getAllData)("database.json");
        const id = req.body.bookID;
        const existingBook = allbooksData.find((book) => book.id === id);
        if (!existingBook) {
            return res.send({
                message: `Book with the ID ${id} dose not exists`
            });
        }
        allbooksData.forEach((book) => {
            if (book.id === id) {
                for (let fild in req.body) {
                    book[fild] = req.body[fild];
                }
                book.updatedAt = new Date();
            }
        });
        (0, indexu_1.createData)("database.json", allbooksData);
        res.redirect("/book/readAllBooks");
    }
    catch (error) {
        console.log("UpdateBookError", error);
    }
};
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => {
    const allbooksData = (0, indexu_1.getAllData)("database.json");
    const id = req.body.bookID;
    const existingBook = allbooksData.find((book) => book.id === id);
    if (!existingBook) {
        return res.send({
            message: `Book with the ID ${id} dose not exists`
        });
    }
    const filteredBooks = allbooksData.filter((e) => e.id !== id);
    (0, indexu_1.createData)("database.json", filteredBooks);
    res.redirect("/book/readAllBooks");
};
exports.deleteBook = deleteBook;
//# sourceMappingURL=index.js.map