const assert = require('node:assert/strict');
const { beforeEach, test } = require('node:test');
const request = require('supertest');
const app = require('../src/app');
const { resetMemoryStore } = require('../src/data/store');

beforeEach(() => {
  resetMemoryStore();
});

test('health endpoint reports memory storage mode by default', async () => {
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
  assert.equal(response.body.storage, 'memory');
});

test('question endpoint serves read-only HTML/CSS MCQs from mcqs.js', async () => {
  const response = await request(app).get('/api/questions');

  assert.equal(response.status, 200);
  assert.ok(response.body.length > 0);
  assert.ok(response.body.some((question) => question.id === 'hc-01'));
  assert.ok(response.body.some((question) => question.id === 'html-01'));
  assert.ok(response.body.every((question) => question.subject === 'HTML & CSS'));
  assert.ok(response.body.every((question) => Array.isArray(question.options) && question.options.length > 0));
  assert.ok(response.body.every((question) => !['git-01', 'react-01', 'node-01'].includes(question.id)));

  const createResponse = await request(app).post('/api/questions').send({ text: 'New question' });
  assert.equal(createResponse.status, 405);
  assert.match(createResponse.body.message, /read-only/i);
});

test('paper endpoints create a paper with calculated total marks', async () => {
  const questionResponse = await request(app).get('/api/questions');
  const selected = questionResponse.body.slice(0, 2).map((question) => ({
    questionId: question.id,
    text: question.text,
    topic: question.topic,
    difficulty: question.difficulty,
    marks: question.marks,
    options: question.options,
    answer: question.answer,
  }));

  const paperResponse = await request(app).post('/api/papers').send({
    title: 'Unit Test Paper',
    subject: 'General Science',
    duration: '60 minutes',
    instructions: 'Attempt all questions.',
    questions: selected,
  });

  assert.equal(paperResponse.status, 201);
  assert.equal(paperResponse.body.totalMarks, selected[0].marks + selected[1].marks);
  assert.equal(paperResponse.body.questions.length, 2);
  assert.deepEqual(paperResponse.body.questions[0].options, selected[0].options);
});
