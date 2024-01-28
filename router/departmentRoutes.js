// departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/DepartmentController');

// POST - Add a single department
router.post('/addDepartment', departmentController.addDepartment);

// POST - Add multiple departments
router.post('/addDepartments', departmentController.addDepartments);

// GET - Retrieve all departments
router.get('/allDepartments', departmentController.getAllDepartments);

// GET - Retrieve a single department by ID
router.get('/departmentById/:id', departmentController.getDepartmentById);

// PUT - Update a department
router.put('/updateDepartment', departmentController.updateDepartment);

// DELETE - Delete a department by ID
router.delete('/deleteDepartment/:id', departmentController.deleteDepartment);

module.exports = router;
