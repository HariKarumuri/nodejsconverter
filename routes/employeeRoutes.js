// routes/employeeRoutes.js

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API for managing employees
 */

const express = require('express');
const router = express.Router();
const employeeService = require('../models/Employee'); // Assuming you have a service for Employee

/**
 * @swagger
 * /employees/addEmployee:
 *   post:
 *     summary: Add a single employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "John Doe", "position": "Software Engineer", "salary": 70000}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "John Doe", "position": "Software Engineer", "salary": 70000}
 *       '500':
 *         description: Internal Server Error
 */
router.post('/addEmployee', async (req, res) => {
    try {
        const employee = await employeeService.saveEmployee(req.body);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /employees/addEmployees:
 *   post:
 *     summary: Add multiple employees
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: [{"name": "John Doe", "position": "Software Engineer", "salary": 70000}, {"name": "Jane Smith", "position": "UX Designer", "salary": 60000}]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "John Doe", "position": "Software Engineer", "salary": 70000}, {"id": 2, "name": "Jane Smith", "position": "UX Designer", "salary": 60000}]
 *       '500':
 *         description: Internal Server Error
 */
router.post('/addEmployees', async (req, res) => {
    try {
        const employees = await employeeService.saveEmployees(req.body);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /employees/employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "John Doe", "position": "Software Engineer", "salary": 70000}, {"id": 2, "name": "Jane Smith", "position": "UX Designer", "salary": 60000}]
 *       '500':
 *         description: Internal Server Error
 */
router.get('/employees', async (req, res) => {
    try {
        const employees = await employeeService.getEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /employees/employeeById/{id}:
 *   get:
 *     summary: Retrieve a single employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "John Doe", "position": "Software Engineer", "salary": 70000}
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example: { error: 'Employee not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.get('/employeeById/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const employee = await employeeService.getEmployeeById(id);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /employees/updateEmployee:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"id": 1, "name": "Updated John Doe", "position": "Senior Software Engineer", "salary": 80000}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Updated John Doe", "position": "Senior Software Engineer", "salary": 80000}
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example: { error: 'Employee not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.put('/updateEmployee', async (req, res) => {
    try {
        const updatedEmployee = await employeeService.updateEmployee(req.body);
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /employees/deleteEmployee/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"message": "Employee deleted successfully"}
 *       '404':
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example: { error: 'Employee not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/deleteEmployee/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await employeeService.deleteEmployee(id);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
