const express = require('express');
const { createQuestion, deleteQuestion, listQuestions, updateQuestion } = require('../data/store');

const router = express.Router();
const allowedDifficulties = ['Easy', 'Medium', 'Hard'];

function sanitizeQuestion(body) {
  return {
    text: String(body.text || '').trim(),
    subject: String(body.subject || '').trim(),
    topic: String(body.topic || '').trim(),
    difficulty: String(body.difficulty || 'Medium').trim(),
    marks: Number(body.marks),
    answer: String(body.answer || '').trim(),
    tags: Array.isArray(body.tags)
      ? body.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
  };
}

function validateQuestion(question) {
  if (!question.text || !question.subject || !question.topic) {
    return 'Text, subject, and topic are required.';
  }

  if (!allowedDifficulties.includes(question.difficulty)) {
    return 'Difficulty must be Easy, Medium, or Hard.';
  }

  if (!Number.isFinite(question.marks) || question.marks < 1) {
    return 'Marks must be a positive number.';
  }

  return null;
}

router.get('/', async (req, res, next) => {
  try {
    const questions = await listQuestions(req.query);
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = sanitizeQuestion(req.body);
    const validationError = validateQuestion(payload);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const question = await createQuestion(payload);
    return res.status(201).json(question);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = sanitizeQuestion(req.body);
    const validationError = validateQuestion(payload);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const question = await updateQuestion(req.params.id, payload);
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    return res.json(question);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await deleteQuestion(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
