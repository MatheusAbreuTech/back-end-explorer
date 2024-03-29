require('express-async-errors');
require('dotenv/config');

const migrationRun = require('./database/sqlite/migrations');
const AppError = require('./Utils/AppError');
const uploadConfig = require('./configs/upload');

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

migrationRun();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
