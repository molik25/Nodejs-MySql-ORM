const express = require('express');
const sequelize = require('./dbconfig');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/posts', postRoutes);

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Creates the table if it doesn't exist
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
