const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    marks: { type: Number, required: true, min: 1 },
    answer: { type: String, default: '', trim: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Question || mongoose.model('Question', questionSchema);
