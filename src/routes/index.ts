import express from 'express';
import { bookDetails, createBook, createBookForm, deleteBook, getHomePage, readAllBooks, updateBook, updateBookForm } from "../controlers";

const router = express.Router();
router.use(express.static("public"))
/* GET home page. */
router.get('/', getHomePage)

router.get("/readAllBooks", readAllBooks);
router.post("/bookDetails", bookDetails)

router.get("/createBook", createBookForm);
router.post("/createBook", createBook);

router.post("/updateBookdetails", updateBook);
router.post("/updateBook", updateBookForm);

router.post("/deleteBook", deleteBook);



export default router;
