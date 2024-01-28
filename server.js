const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');  // Make sure to provide the correct path to your Sequelize instance
const departmentRoutes = require('./router/departmentRoutes');
const clientRoutes = require('./router/clientRoutes');
const assetRoutes = require('./router/assetRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the routes
app.use('/api/departments', departmentRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/assets', assetRoutes);

// Sync the Sequelize models with the database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized.');
    // Start the server after the database sync is complete
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
