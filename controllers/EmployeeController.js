const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService'); // Assuming you have a service for Employee

// Add Employee
router.post('/addEmployee', async (req, res) => {
    try {
        const employee = await employeeService.saveEmployee(req.body);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Multiple Employees
router.post('/addEmployees', async (req, res) => {
    try {
        const employees = await employeeService.saveEmployees(req.body);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await employeeService.getEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Employee by ID
router.get('/employeeById/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const employee = await employeeService.getEmployeeById(id);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Employee
router.put('/updateEmployee', async (req, res) => {
    try {
        const updatedEmployee = await employeeService.updateEmployee(req.body);
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Employee by ID
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
