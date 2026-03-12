const mongoose = require('mongoose');

const paperQuestionSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    text: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    marks: { type: Number, required: true, min: 1 },
    options: { type: [String], default: [] },
    answer: { type: String, default: '', trim: true },
  },
  { _id: false },
);

const examPaperSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    instructions: { type: String, default: '', trim: true },
    totalMarks: { type: Number, required: true, min: 1 },
    questions: { type: [paperQuestionSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.models.ExamPaper || mongoose.model('ExamPaper', examPaperSchema);
