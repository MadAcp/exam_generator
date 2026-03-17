const express = require('express');
const { listQuestions } = require('../data/store');

const router = express.Router();
const readOnlyMessage = 'Question bank is read-only and served from server/src/data/mcqs.js.';

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
    return res.status(405).json({ message: readOnlyMessage });
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    return res.status(405).json({ message: readOnlyMessage });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    return res.status(405).json({ message: readOnlyMessage });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
