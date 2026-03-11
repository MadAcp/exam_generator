const dotenv = require('dotenv');
const app = require('./app');
const { connectDatabase } = require('./data/store');

dotenv.config();

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Exam generator API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start server:', error);
  process.exit(1);
});
