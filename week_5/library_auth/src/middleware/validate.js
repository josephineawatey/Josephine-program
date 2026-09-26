export const validateBook = (req, res, next) => {
  if (req.method === 'POST') {
    const { title, author, isbn } = req.body;
    if (!title || !author || !isbn) {
      return res.status(400).json({ message: 'title, author, isbn are required' });
    }
  }
  if (req.body.copiesAvailable !== undefined && req.body.copiesTotal !== undefined) {
    if (req.body.copiesAvailable > req.body.copiesTotal) {
      return res.status(400).json({ message: 'copiesAvailable cannot be greater than copiesTotal' });
    }
  }
  next();
};