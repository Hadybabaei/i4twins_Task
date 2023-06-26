const mongoose = require('mongoose');
const app = require('./utils/express');
const path = require("path");
const routes = require('./routes/index');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    app.use('/api', routes);

    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

