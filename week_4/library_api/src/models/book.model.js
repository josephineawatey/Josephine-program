import mongoose from 'mongoose';

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  genre: {
    type: String,
    enum: ['fiction', 'non-fiction', 'science', 'history', 'biography', 'fantasy']
  },
  publishedYear: {
    type: Number,
    min: 1460,
    max: currentYear,
    validate: {
      validator: Number.isInteger,
      message: 'publishedYear must be an integer'
    }
  },
  copiesTotal: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
    validate: {
      validator: Number.isInteger,
      message: 'copiesTotal must be an integer'
    }
  },
  copiesAvailable: {
    type: Number,
    min: 0,
    default: 1,
    validate: [
      {
        validator: Number.isInteger,
        message: 'copiesAvailable must be an integer'
      },
      {
        validator: function(v) {
          // for new docs, compare to this.copiesTotal, if not set use 1
          const total = this.copiesTotal ?? 1;
          return v <= total;
        },
        message: 'copiesAvailable cannot be greater than copiesTotal'
      }
    ]
  }
}, { timestamps: true });

// Text index for ?q= search
bookSchema.index({ title: 'text', author: 'text' });
// For filter by author + title
bookSchema.index({ author: 1, title: 1 });


export default mongoose.model('Book', bookSchema);