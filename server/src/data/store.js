const { randomUUID } = require('crypto');
const mongoose = require('mongoose');
const Question = require('../models/Question');
const ExamPaper = require('../models/ExamPaper');
const { seedQuestions } = require('./sampleData');

let storageMode = 'memory';
const memoryStore = {
  questions: seedQuestions.map((question) => ({ ...question })),
  papers: [],
};

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeQuestion(question) {
  return {
    id: String(question._id || question.id),
    text: question.text,
    subject: question.subject,
    topic: question.topic,
    difficulty: question.difficulty,
    marks: question.marks,
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
    console.log('MONGO_URI not found. Using in-memory sample data.');
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
  memoryStore.questions = seedQuestions.map((question) => ({ ...question }));
  memoryStore.papers = [];
}

async function listQuestions(filters = {}) {
  if (storageMode === 'mongo') {
    const query = {};
    if (filters.subject) {
      query.subject = new RegExp(`^${escapeRegex(filters.subject.trim())}$`, 'i');
    }
    if (filters.topic) {
      query.topic = new RegExp(`^${escapeRegex(filters.topic.trim())}$`, 'i');
    }
    if (filters.difficulty) {
      query.difficulty = new RegExp(`^${escapeRegex(filters.difficulty.trim())}$`, 'i');
    }
    if (filters.search) {
      const searchRegex = new RegExp(escapeRegex(filters.search.trim()), 'i');
      query.$or = [{ text: searchRegex }, { subject: searchRegex }, { topic: searchRegex }, { tags: searchRegex }];
    }

    const questions = await Question.find(query).sort({ createdAt: -1 }).lean();
    return questions.map(normalizeQuestion);
  }

  return memoryStore.questions.filter((question) => matchesFilter(question, filters)).map(normalizeQuestion);
}

async function createQuestion(payload) {
  if (storageMode === 'mongo') {
    const question = await Question.create(payload);
    return normalizeQuestion(question.toObject());
  }

  const question = {
    id: randomUUID(),
    ...payload,
    createdAt: new Date().toISOString(),
  };
  memoryStore.questions.unshift(question);
  return normalizeQuestion(question);
}

async function updateQuestion(id, payload) {
  if (storageMode === 'mongo') {
    const question = await Question.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
    return question ? normalizeQuestion(question) : null;
  }

  const index = memoryStore.questions.findIndex((question) => question.id === id);
  if (index === -1) {
    return null;
  }

  memoryStore.questions[index] = { ...memoryStore.questions[index], ...payload };
  return normalizeQuestion(memoryStore.questions[index]);
}

async function deleteQuestion(id) {
  if (storageMode === 'mongo') {
    const deleted = await Question.findByIdAndDelete(id).lean();
    return Boolean(deleted);
  }

  const index = memoryStore.questions.findIndex((question) => question.id === id);
  if (index === -1) {
    return false;
  }

  memoryStore.questions.splice(index, 1);
  return true;
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
  createQuestion,
  deleteQuestion,
  getPaper,
  getStorageMode,
  listPapers,
  listQuestions,
  resetMemoryStore,
  updatePaper,
  updateQuestion,
};
