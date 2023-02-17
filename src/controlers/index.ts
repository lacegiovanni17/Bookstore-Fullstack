import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from "uuid";
import { createData, getAllData } from '../utils/indexu';

export const getHomePage = (req: Request, res: Response, next: NextFunction) => {
  res.render("landingpage");
}

export const readAllBooks = (req: Request, res: Response, next: NextFunction) => {
    let allbooksData = getAllData("database.json");
  res.render("homepage", { checkings: allbooksData });
}
export const bookDetails = (req: Request, res: Response, next: NextFunction) => {
  let allbooksData = getAllData("database.json");
  const id = req.body.bookID;
  const currentBook = allbooksData.find((book: any) => book.id === id)
  res.render("viewbookdetail", { book: currentBook });
}

export const createBookForm = (req: Request, res: Response, next: NextFunction) => { 
  res.render("createbook");
}

export const createBook = (req: Request, res: Response, next: NextFunction) => {
    const allbooksData = getAllData("database.json");

  const { title, author, datePublished, Description, pageCount, genre, publisher } = req.body
  
  
    const existingBook = allbooksData.find((e: any) => e.Title === title)
  if (existingBook) {
    return res.send({
      message: `Book with the title ${title} already exists`    });
  }
    const data = { "id": uuidv4(), "Title": title, "Author":author, "datePublished":datePublished, "Description":Description, "pageCount":pageCount, "Genre":genre,"Publisher": publisher, "createdat": new Date(), "updatedat": new Date() }
    allbooksData.push(data);
    createData("database.json", allbooksData)
    res.redirect("/book/readAllBooks");
}

export const updateBookForm = (req: Request, res: Response, next: NextFunction) => { 
  const allbooksData = getAllData("database.json");
  const id = req.body.bookID;
  const currentBook = allbooksData.find((book:any) => book.id === id)

  res.render("editbook", { book: currentBook });
}

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const allbooksData = getAllData("database.json");
  const id = req.body.bookID;
  const existingBook = allbooksData.find((book:any) => book.id === id)
  if (!existingBook) {
    return res.send({
      message: `Book with the ID ${id} dose not exists`    });
  }
  allbooksData.forEach((book: any) => {
    if (book.id === id) {
      for (let fild in req.body){
        book[fild] = req.body[fild]
            }
            book.updatedAt = new Date()
          }
  });
  createData("database.json", allbooksData);
    res.redirect("/book/readAllBooks");
  } catch (error) {
    console.log("UpdateBookError",error);
  }
}

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const allbooksData = getAllData("database.json");
  const id = req.body.bookID;
  const existingBook = allbooksData.find((book:any) => book.id === id)
    if (!existingBook) {
      return res.send({
      message: `Book with the ID ${id} dose not exists`    });
    }
  const filteredBooks = allbooksData.filter((e: any) => e.id !== id);
  createData("database.json", filteredBooks);
  res.redirect("/book/readAllBooks");
}