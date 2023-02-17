"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controlers_1 = require("../controlers");
const router = express_1.default.Router();
router.use(express_1.default.static("public"));
/* GET home page. */
router.get('/', controlers_1.getHomePage);
router.get("/readAllBooks", controlers_1.readAllBooks);
router.post("/bookDetails", controlers_1.bookDetails);
router.get("/createBook", controlers_1.createBookForm);
router.post("/createBook", controlers_1.createBook);
router.post("/updateBookdetails", controlers_1.updateBook);
router.post("/updateBook", controlers_1.updateBookForm);
router.post("/deleteBook", controlers_1.deleteBook);
exports.default = router;
//# sourceMappingURL=index.js.map