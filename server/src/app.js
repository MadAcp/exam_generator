const express = require('express');
const cors = require('cors');
const questionRoutes = require('./routes/questions');
const paperRoutes = require('./routes/papers');
const { getStorageMode } = require('./data/store');

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', storage: getStorageMode() });
});

app.use('/api/questions', questionRoutes);
app.use('/api/papers', paperRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
