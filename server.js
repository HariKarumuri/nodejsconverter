// app.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const userRoutes = require('./routes/userRoutes'); 
const assetsRoutes = require('./routes/assestRoutes'); 
const clientRoutes = require('./routes/clientRoutes'); 
const departmentRoutes = require('./routes/departmentRoutes'); 
const designationRoutes = require('./routes/designationRoutes'); 
const employeeRoutes = require('./routes/employeeRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define Swagger specification
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API Description',
    },
  },
  apis: [
    path.join(__dirname, 'routes/*.js'), // Include all route files
    path.join(__dirname, 'routes/userRoutes.js'), // Include the user routes explicitly
    path.join(__dirname, 'models/User.js'), // Include the User model
    path.join(__dirname, 'models/Asset.js'), // Included the Assests model
    path.join(__dirname, 'models/Client.js'), // Included the Client model
    path.join(__dirname, 'models/Department.js'), // Included the Client model
    path.join(__dirname, 'models/Employee.js'), // Included the Client model
    path.join(__dirname, 'models/Designation.js'), // Included the Client model
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the test route
app.use('/api', require('./routes/test'));

// Use the user routes
app.use('/api', userRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/designation', designationRoutes);
app.use('/api/department',departmentRoutes);


db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized.');

    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
