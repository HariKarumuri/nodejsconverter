// routes/assetRoutes.js

/**
 * @swagger
 * tags:
 *   name: Assets
 *   description: API for managing assets
 */

const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

/**
 * @swagger
 * /assets/addAsset:
 *   post:
 *     summary: Add a single asset
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Asset1", "description": "Description1"}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Asset1", "description": "Description1"}
 *       '500':
 *         description: Internal Server Error
 */
router.post('/addAsset', async (req, res) => {
    try {
        const newAsset = await Asset.create(req.body);
        res.json(newAsset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /assets/addAssets:
 *   post:
 *     summary: Add multiple assets
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: [{"name": "Asset1", "description": "Description1"}, {"name": "Asset2", "description": "Description2"}]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "Asset1", "description": "Description1"}, {"id": 2, "name": "Asset2", "description": "Description2"}]
 *       '500':
 *         description: Internal Server Error
 */
router.post('/addAssets', async (req, res) => {
    try {
        const newAssets = await Asset.bulkCreate(req.body);
        res.json(newAssets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /assets/assets:
 *   get:
 *     summary: Retrieve all assets
 *     tags: [Assets]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "name": "Asset1", "description": "Description1"}, {"id": 2, "name": "Asset2", "description": "Description2"}]
 *       '500':
 *         description: Internal Server Error
 */
router.get('/assets', async (req, res) => {
    try {
        const allAssets = await Asset.findAll();
        res.json(allAssets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /assets/assetById/{id}:
 *   get:
 *     summary: Retrieve a single asset by ID
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Asset ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "Asset1", "description": "Description1"}
 *       '404':
 *         description: Asset not found
 *         content:
 *           application/json:
 *             example: { error: 'Asset not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.get('/assetById/:id', async (req, res) => {
    const assetId = req.params.id;

    try {
        const asset = await Asset.findByPk(assetId);

        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        res.json(asset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /assets/updateAsset:
 *   put:
 *     summary: Update an asset
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"id": 1, "name": "UpdatedAsset", "description": "UpdatedDescription"}
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "name": "UpdatedAsset", "description": "UpdatedDescription"}
 *       '404':
 *         description: Asset not found
 *         content:
 *           application/json:
 *             example: { error: 'Asset not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.put('/updateAsset', async (req, res) => {
    try {
        const updatedAsset = await Asset.update(req.body, {
            where: { id: req.body.id },
            returning: true,
        });

        if (updatedAsset[0] === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        res.json(updatedAsset[1][0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /assets/deleteAsset/{id}:
 *   delete:
 *     summary: Delete an asset by ID
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Asset ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"message": "Asset deleted successfully"}
 *       '404':
 *         description: Asset not found
 *         content:
 *           application/json:
 *             example: { error: 'Asset not found' }
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/deleteAsset/:id', async (req, res) => {
    const assetId = req.params.id;

    try {
        const deletedAssetCount = await Asset.destroy({
            where: { id: assetId },
        });

        if (deletedAssetCount === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        res.json({ message: 'Asset deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
