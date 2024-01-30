// routes/departmentRoutes.js

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: API for managing departments
 */

const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

/**
 * @swagger
 * /departments/addDepartment:
 *   post:
 *     summary: Add a single department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "IT", "description": "Information Technology"}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "IT", "description": "Information Technology"}
 *       '500':
 *         description: Internal Server Error
 */
router.post('/addDepartment', async (req, res) => {
    try {
        const newDepartment = await Department.create(req.body);
        res.json(newDepartment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /departments/addDepartments:
 *   post:
 *     summary: Add multiple departments
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: [{"name": "IT", "description": "Information Technology"}, {"name": "HR", "description": "Human Resources"}]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "IT", "description": "Information Technology"}, {"id": 2, "name": "HR", "description": "Human Resources"}]
 *       '500':
 *         description: Internal Server Error
 */
router.post('/addDepartments', async (req, res) => {
    try {
        const newDepartments = await Department.bulkCreate(req.body);
        res.json(newDepartments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /departments/allDepartments:
 *   get:
 *     summary: Retrieve all departments
 *     tags: [Departments]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "IT", "description": "Information Technology"}, {"id": 2, "name": "HR", "description": "Human Resources"}]
 *       '500':
 *         description: Internal Server Error
 */
router.get('/allDepartments', async (req, res) => {
    try {
        const allDepartments = await Department.findAll();
        res.json(allDepartments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /departments/departmentById/{id}:
 *   get:
 *     summary: Retrieve a single department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Department ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "IT", "description": "Information Technology"}
 *       '404':
 *         description: Department not found
 *         content:
 *           application/json:
 *             example: { error: 'Department not found' }
 *       '500':
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /departments/updateDepartment:
 *   put:
 *     summary: Update a department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"id": 1, "name": "Updated IT", "description": "Updated Information Technology"}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Updated IT", "description": "Updated Information Technology"}
 *       '404':
 *         description: Department not found
 *         content:
 *           application/json:
 *             example: { error: 'Department not found' }
 *       '500':
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /departments/deleteDepartment/{id}:
 *   delete:
 *     summary: Delete a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Department ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"message": "Department deleted successfully"}
 *       '404':
 *         description: Department not found
 *         content:
 *           application/json:
 *             example: { error: 'Department not found' }
 *       '500':
 *         description: Internal Server Error
 */
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
