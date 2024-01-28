const express = require('express');
const router = express.Router();
const designationService = require('../services/designationService'); // Replace with the correct path

// Get all designations
router.get('/all', async (req, res) => {
    try {
        const allDesignations = await designationService.getAllDesignations();
        res.json(allDesignations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get designation by ID
router.get('/:id', async (req, res) => {
    const designationId = req.params.id;
    try {
        const designation = await designationService.getDesignationById(designationId);
        res.json(designation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new designation
router.post('/add', async (req, res) => {
    const newDesignation = req.body;
    try {
        const addedDesignation = await designationService.saveOrUpdateDesignation(newDesignation);
        res.json(addedDesignation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update designation by ID
router.put('/update/:id', async (req, res) => {
    const designationId = req.params.id;
    const updatedDesignation = req.body;
    try {
        const designation = await designationService.updateDesignation(designationId, updatedDesignation);
        res.json(designation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete designation by ID
router.delete('/delete/:id', async (req, res) => {
    const designationId = req.params.id;
    try {
        await designationService.deleteDesignation(designationId);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
