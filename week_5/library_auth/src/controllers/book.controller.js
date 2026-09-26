import Book from '../models/book.model.js';
export const getBooks = async (req,res)=>{ res.json(await Book.find()) };
export const getBookById = async (req,res)=>{ const b=await Book.findById(req.params.id); if(!b) return res.status(404).json({message:'Not found'}); res.json(b) };
export const createBook = async (req,res)=>{ const b=await Book.create({...req.body,availableCopies:req.body.copies}); res.status(201).json(b) };
export const updateBook = async (req,res)=>{ const b=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true}); res.json(b) };
export const deleteBook = async (req,res)=>{ await Book.findByIdAndDelete(req.params.id); res.json({message:'Deleted'}) };
