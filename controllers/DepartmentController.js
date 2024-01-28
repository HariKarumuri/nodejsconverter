const express = require('express');
const router = express.Router();
const Department = require('../models/Department'); // Assuming you have a Sequelize Department model

// Add your Sequelize instance setup if not already done

// POST - Add a single department
router.post('/addDepartment', async (req, res) => {
    try {
        const newDepartment = await Department.create(req.body);
        res.json(newDepartment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST - Add multiple departments
router.post('/addDepartments', async (req, res) => {
    try {
        const newDepartments = await Department.bulkCreate(req.body);
        res.json(newDepartments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - Retrieve all departments
router.get('/allDepartments', async (req, res) => {
    try {
        const allDepartments = await Department.findAll();
        res.json(allDepartments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - Retrieve a single department by ID
router.get('/departmentById/:id', async (req, res) => {
    const departmentId = req.params.id;

    try {
        const department = await Department.findByPk(departmentId);

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json(department);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT - Update a department
router.put('/updateDepartment', async (req, res) => {
    try {
        const updatedDepartment = await Department.update(req.body, {
            where: { id: req.body.id },
            returning: true,
        });

        if (updatedDepartment[0] === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json(updatedDepartment[1][0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE - Delete a department by ID
router.delete('/deleteDepartment/:id', async (req, res) => {
    const departmentId = req.params.id;

    try {
        const deletedDepartmentCount = await Department.destroy({
            where: { id: departmentId },
        });

        if (deletedDepartmentCount === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
