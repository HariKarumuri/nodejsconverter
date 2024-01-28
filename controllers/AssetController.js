const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset'); // Assuming you have a Sequelize Asset model

// Add your Sequelize instance setup if not already done

// POST - Add a single asset
router.post('/addAsset', async (req, res) => {
    try {
        const newAsset = await Asset.create(req.body);
        res.json(newAsset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST - Add multiple assets
router.post('/addAssets', async (req, res) => {
    try {
        const newAssets = await Asset.bulkCreate(req.body);
        res.json(newAssets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - Retrieve all assets
router.get('/assets', async (req, res) => {
    try {
        const allAssets = await Asset.findAll();
        res.json(allAssets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - Retrieve a single asset by ID
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

// PUT - Update an asset
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

// DELETE - Delete an asset by ID
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
