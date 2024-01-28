const express = require('express');
const router = express.Router();
const Client = require('../models/Client'); // Assuming you have a Sequelize Client model

// Add your Sequelize instance setup if not already done

// POST - Add a single client
router.post('/addClient', async (req, res) => {
    try {
        const newClient = await Client.create(req.body);
        res.json(newClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST - Add multiple clients
router.post('/addClients', async (req, res) => {
    try {
        const newClients = await Client.bulkCreate(req.body);
        res.json(newClients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - Retrieve all clients
router.get('/clients', async (req, res) => {
    try {
        const allClients = await Client.findAll();
        res.json(allClients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - Retrieve a single client by ID
router.get('/clientById/:id', async (req, res) => {
    const clientId = req.params.id;

    try {
        const client = await Client.findByPk(clientId);

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT - Update a client
router.put('/updateClient', async (req, res) => {
    try {
        const updatedClient = await Client.update(req.body, {
            where: { id: req.body.id },
            returning: true,
        });

        if (updatedClient[0] === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.json(updatedClient[1][0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE - Delete a client by ID
router.delete('/deleteClient/:id', async (req, res) => {
    const clientId = req.params.id;

    try {
        const deletedClientCount = await Client.destroy({
            where: { id: clientId },
        });

        if (deletedClientCount === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
