
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API for managing clients
 */

const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

/**
 * @swagger
 * /clients/addClient:
 *   post:
 *     summary: Add a single client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Client1", "email": "client1@example.com"}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Client1", "email": "client1@example.com"}
 *       '500':
 *         description: Internal Server Error
 */
router.post('/addClient', async (req, res) => {
    try {
        const newClient = await Client.create(req.body);
        res.json(newClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /clients/addClients:
 *   post:
 *     summary: Add multiple clients
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: [{"name": "Client1", "email": "client1@example.com"}, {"name": "Client2", "email": "client2@example.com"}]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "Client1", "email": "client1@example.com"}, {"id": 2, "name": "Client2", "email": "client2@example.com"}]
 *       '500':
 *         description: Internal Server Error
 */
router.post('/addClients', async (req, res) => {
    try {
        const newClients = await Client.bulkCreate(req.body);
        res.json(newClients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /clients/clients:
 *   get:
 *     summary: Retrieve all clients
 *     tags: [Clients]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "Client1", "email": "client1@example.com"}, {"id": 2, "name": "Client2", "email": "client2@example.com"}]
 *       '500':
 *         description: Internal Server Error
 */
router.get('/clients', async (req, res) => {
    try {
        const allClients = await Client.findAll();
        res.json(allClients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /clients/clientById/{id}:
 *   get:
 *     summary: Retrieve a single client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Client1", "email": "client1@example.com"}
 *       '404':
 *         description: Client not found
 *         content:
 *           application/json:
 *             example: { error: 'Client not found' }
 *       '500':
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /clients/updateClient:
 *   put:
 *     summary: Update a client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"id": 1, "name": "UpdatedClient", "email": "updatedclient@example.com"}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "UpdatedClient", "email": "updatedclient@example.com"}
 *       '404':
 *         description: Client not found
 *         content:
 *           application/json:
 *             example: { error: 'Client not found' }
 *       '500':
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /clients/deleteClient/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"message": "Client deleted successfully"}
 *       '404':
 *         description: Client not found
 *         content:
 *           application/json:
 *             example: { error: 'Client not found' }
 *       '500':
 *         description: Internal Server Error
 */
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
