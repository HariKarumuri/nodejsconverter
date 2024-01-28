// clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

// POST - Add a single client
router.post('/addClient', clientController.addClient);

// POST - Add multiple clients
router.post('/addClients', clientController.addClients);

// GET - Retrieve all clients
router.get('/clients', clientController.getAllClients);

// GET - Retrieve a single client by ID
router.get('/clientById/:id', clientController.getClientById);

// PUT - Update a client
router.put('/updateClient', clientController.updateClient);

// DELETE - Delete a client by ID
router.delete('/deleteClient/:id', clientController.deleteClient);

module.exports = router;
