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

test('question endpoints support create and update', async () => {
  const createResponse = await request(app).post('/api/questions').send({
    text: 'What is the value of 12 ÷ 3?',
    subject: 'Mathematics',
    topic: 'Arithmetic',
    difficulty: 'Easy',
    marks: 2,
    answer: '4',
    tags: ['division'],
  });

  assert.equal(createResponse.status, 201);
  assert.equal(createResponse.body.topic, 'Arithmetic');

  const updateResponse = await request(app)
    .put(`/api/questions/${createResponse.body.id}`)
    .send({
      text: 'What is the value of 15 ÷ 3?',
      subject: 'Mathematics',
      topic: 'Arithmetic',
      difficulty: 'Easy',
      marks: 2,
      answer: '5',
      tags: ['division'],
    });

  assert.equal(updateResponse.status, 200);
  assert.equal(updateResponse.body.answer, '5');
});

test('paper endpoints create a paper with calculated total marks', async () => {
  const questionResponse = await request(app).get('/api/questions');
  const selected = questionResponse.body.slice(0, 2).map((question) => ({
    questionId: question.id,
    text: question.text,
    topic: question.topic,
    difficulty: question.difficulty,
    marks: question.marks,
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
});
