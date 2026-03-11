const express = require('express');
const { createPaper, getPaper, listPapers, updatePaper } = require('../data/store');

const router = express.Router();
const allowedDifficulties = ['Easy', 'Medium', 'Hard'];

function sanitizePaper(body) {
  const questions = Array.isArray(body.questions)
    ? body.questions.map((question, index) => ({
        questionId: String(question.questionId || question.id || `custom-${index + 1}`),
        text: String(question.text || '').trim(),
        topic: String(question.topic || '').trim(),
        difficulty: String(question.difficulty || 'Medium').trim(),
        marks: Number(question.marks),
        answer: String(question.answer || '').trim(),
      }))
    : [];

  return {
    title: String(body.title || '').trim(),
    subject: String(body.subject || '').trim(),
    duration: String(body.duration || '').trim(),
    instructions: String(body.instructions || '').trim(),
    totalMarks: questions.reduce((sum, question) => sum + question.marks, 0),
    questions,
  };
}

function validatePaper(paper) {
  if (!paper.title || !paper.subject || !paper.duration) {
    return 'Title, subject, and duration are required.';
  }

  if (paper.questions.length === 0) {
    return 'Select at least one question for the paper.';
  }

  const invalidQuestion = paper.questions.find(
    (question) =>
      !question.text ||
      !question.topic ||
      !allowedDifficulties.includes(question.difficulty) ||
      !Number.isFinite(question.marks) ||
      question.marks < 1,
  );

  if (invalidQuestion) {
    return 'Every selected question must include text, topic, difficulty, and marks.';
  }

  return null;
}

router.get('/', async (_req, res, next) => {
  try {
    const papers = await listPapers();
    res.json(papers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const paper = await getPaper(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found.' });
    }

    return res.json(paper);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = sanitizePaper(req.body);
    const validationError = validatePaper(payload);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const paper = await createPaper(payload);
    return res.status(201).json(paper);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = sanitizePaper(req.body);
    const validationError = validatePaper(payload);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const paper = await updatePaper(req.params.id, payload);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found.' });
    }

    return res.json(paper);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
