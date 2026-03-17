const { randomUUID } = require('crypto');
const mongoose = require('mongoose');
const ExamPaper = require('../models/ExamPaper');
const { htmlCssMcqBank } = require('./htmlCssMcqBank');
const { jsdomMcqBank } = require('./jsdomMcqBank');
const { reactMcqBank } = require('./reactMcqBank');
const { mernMcqBank } = require('./mernMcqBank');
const { gitAgileRegexMcqBank } = require('./gitAgileRegexMcqBank');

const mcqBanks = [
  { questions: htmlCssMcqBank, subject: 'HTML & CSS' },
  { questions: jsdomMcqBank, subject: 'JavaScript & DOM' },
  { questions: reactMcqBank, subject: 'React' },
  { questions: mernMcqBank, subject: 'MERN' },
  { questions: gitAgileRegexMcqBank, subject: 'Git, Agile, Regex' },
];

let storageMode = 'memory';

function prepareMcqQuestion(question, defaultSubject) {
  return {
    id: String(question.id),
    text: String(question.text || '').trim(),
    subject: String(defaultSubject || question.subject || 'General').trim(),
    topic: String(question.topic || defaultSubject || 'General').trim(),
    difficulty: String(question.difficulty || 'Medium').trim(),
    marks: Number(question.marks) || 1,
    options: Array.isArray(question.options)
      ? question.options.map((option) => String(option).trim()).filter(Boolean)
      : [],
    answer: String(question.answer || '').trim(),
    tags: Array.isArray(question.tags)
      ? question.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
  };
}

const questionBank = mcqBanks.flatMap(({ questions, subject }) =>
  questions.map((question) => prepareMcqQuestion(question, subject)),
);

const memoryStore = {
  papers: [],
};

function normalizeQuestion(question) {
  return {
    id: String(question._id || question.id),
    text: question.text,
    subject: question.subject,
    topic: question.topic,
    difficulty: question.difficulty,
    marks: question.marks,
    options: Array.isArray(question.options) ? question.options : [],
    answer: question.answer || '',
    tags: question.tags || [],
    createdAt: question.createdAt || null,
  };
}

function normalizePaper(paper) {
  return {
    id: String(paper._id || paper.id),
    title: paper.title,
    subject: paper.subject,
    duration: paper.duration,
    instructions: paper.instructions || '',
    totalMarks: paper.totalMarks,
    questions: paper.questions.map((question) => ({ ...question })),
    createdAt: paper.createdAt || null,
  };
}

function matchesFilter(question, filters) {
  const search = filters.search?.trim().toLowerCase();
  const subject = filters.subject?.trim().toLowerCase();
  const topic = filters.topic?.trim().toLowerCase();
  const difficulty = filters.difficulty?.trim().toLowerCase();

  if (subject && question.subject.toLowerCase() !== subject) {
    return false;
  }

  if (topic && question.topic.toLowerCase() !== topic) {
    return false;
  }

  if (difficulty && question.difficulty.toLowerCase() !== difficulty) {
    return false;
  }

  if (search) {
    const haystack = [question.text, question.subject, question.topic, ...(question.tags || [])]
      .join(' ')
      .toLowerCase();

    if (!haystack.includes(search)) {
      return false;
    }
  }

  return true;
}

async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    console.log('MONGO_URI not found. Using read-only MCQ banks from server/src/data with in-memory papers.');
    storageMode = 'memory';
    return storageMode;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    storageMode = 'mongo';
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.warn('MongoDB connection failed. Falling back to in-memory mode.', error.message);
    storageMode = 'memory';
  }

  return storageMode;
}

function getStorageMode() {
  return storageMode;
}

function resetMemoryStore() {
  memoryStore.papers = [];
}

async function listQuestions(filters = {}) {
  return questionBank.filter((question) => matchesFilter(question, filters)).map(normalizeQuestion);
}

async function listPapers() {
  if (storageMode === 'mongo') {
    const papers = await ExamPaper.find({}).sort({ createdAt: -1 }).lean();
    return papers.map(normalizePaper);
  }

  return memoryStore.papers.map(normalizePaper);
}

async function getPaper(id) {
  if (storageMode === 'mongo') {
    const paper = await ExamPaper.findById(id).lean();
    return paper ? normalizePaper(paper) : null;
  }

  const paper = memoryStore.papers.find((item) => item.id === id);
  return paper ? normalizePaper(paper) : null;
}

async function createPaper(payload) {
  if (storageMode === 'mongo') {
    const paper = await ExamPaper.create(payload);
    return normalizePaper(paper.toObject());
  }

  const paper = {
    id: randomUUID(),
    ...payload,
    createdAt: new Date().toISOString(),
  };
  memoryStore.papers.unshift(paper);
  return normalizePaper(paper);
}

async function updatePaper(id, payload) {
  if (storageMode === 'mongo') {
    const paper = await ExamPaper.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
    return paper ? normalizePaper(paper) : null;
  }

  const index = memoryStore.papers.findIndex((paper) => paper.id === id);
  if (index === -1) {
    return null;
  }

  memoryStore.papers[index] = { ...memoryStore.papers[index], ...payload };
  return normalizePaper(memoryStore.papers[index]);
}

module.exports = {
  connectDatabase,
  createPaper,
  getPaper,
  getStorageMode,
  listPapers,
  listQuestions,
  resetMemoryStore,
  updatePaper,
};
