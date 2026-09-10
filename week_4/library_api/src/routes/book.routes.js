import express from 'express';
import {getBooks,getBookById,createBook,updateBook,deleteBook} from '../controllers/book.controller.js';
const r=express.Router();
r.get('/',getBooks); r.get('/:id',getBookById); r.post('/',createBook); r.put('/:id',updateBook); r.delete('/:id',deleteBook);
export default r;
