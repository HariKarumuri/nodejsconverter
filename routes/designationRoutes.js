// routes/designationRoutes.js

/**
 * @swagger
 * tags:
 *   name: Designations
 *   description: API for managing designations
 */

const express = require('express');
const router = express.Router();
const designationService = require('../models/Designation'); // Replace with the correct path

/**
 * @swagger
 * /designations/all:
 *   get:
 *     summary: Retrieve all designations
 *     tags: [Designations]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "Manager"}, {"id": 2, "name": "Developer"}]
 *       '500':
 *         description: Internal Server Error
 */
router.get('/all', async (req, res) => {
    try {
        const allDesignations = await designationService.getAllDesignations();
        res.json(allDesignations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /designations/{id}:
 *   get:
 *     summary: Retrieve a designation by ID
 *     tags: [Designations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Designation ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Manager"}
 *       '404':
 *         description: Designation not found
 *         content:
 *           application/json:
 *             example: { error: 'Designation not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
    const designationId = req.params.id;
    try {
        const designation = await designationService.getDesignationById(designationId);
        if (!designation) {
            return res.status(404).json({ error: 'Designation not found' });
        }
        res.json(designation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /designations/add:
 *   post:
 *     summary: Add a new designation
 *     tags: [Designations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Manager"}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Manager"}
 *       '500':
 *         description: Internal Server Error
 */
router.post('/add', async (req, res) => {
    const newDesignation = req.body;
    try {
        const addedDesignation = await designationService.saveOrUpdateDesignation(newDesignation);
        res.json(addedDesignation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /designations/update/{id}:
 *   put:
 *     summary: Update a designation by ID
 *     tags: [Designations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Designation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Updated Manager"}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Updated Manager"}
 *       '404':
 *         description: Designation not found
 *         content:
 *           application/json:
 *             example: { error: 'Designation not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.put('/update/:id', async (req, res) => {
    const designationId = req.params.id;
    const updatedDesignation = req.body;
    try {
        const designation = await designationService.updateDesignation(designationId, updatedDesignation);
        if (!designation) {
            return res.status(404).json({ error: 'Designation not found' });
        }
        res.json(designation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /designations/delete/{id}:
 *   delete:
 *     summary: Delete a designation by ID
 *     tags: [Designations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Designation ID
 *     responses:
 *       '204':
 *         description: Successful response (No content)
 *       '404':
 *         description: Designation not found
 *         content:
 *           application/json:
 *             example: { error: 'Designation not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/delete/:id', async (req, res) => {
    const designationId = req.params.id;
    try {
        const result = await designationService.deleteDesignation(designationId);
        if (!result) {
            return res.status(404).json({ error: 'Designation not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
