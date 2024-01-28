// assetRoutes.js
const express = require('express');
const router = express.Router();
const assetController = require('../controllers/AssetController');

// POST - Add a single asset
router.post('/addAsset', assetController.addAsset);

// POST - Add multiple assets
router.post('/addAssets', assetController.addAssets);

// GET - Retrieve all assets
router.get('/assets', assetController.getAllAssets);

// GET - Retrieve a single asset by ID
router.get('/assetById/:id', assetController.getAssetById);

// PUT - Update an asset
router.put('/updateAsset', assetController.updateAsset);

// DELETE - Delete an asset by ID
router.delete('/deleteAsset/:id', assetController.deleteAsset);

module.exports = router;
