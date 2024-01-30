// routes/test.js
/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test endpoint
 *     description: Test API endpoint for Swagger documentation
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: 'Test successful' }
 */
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Test successful' });
});

module.exports = router;
