/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const express = require('express');
const router = express.Router();
const db = require('../models/index'); // Import the db object instead of creating a new instance
const { User } = db;
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: 'Users retrieved successfully' }
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: { error: 'Internal Server Error' }
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { message: 'User retrieved successfully' }
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example: { message: 'User not found' }
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: { error: 'Internal Server Error' }
 */
router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
