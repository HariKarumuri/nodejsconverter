const express = require('express');
const router = express.Router();
const userRoleService = require('../services/userRoleService');

router.get('/all', async (req, res) => {
  try {
    const userRoles = await userRoleService.getAllUserRoles();
    res.json(userRoles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const userRoleId = req.params.id;
  try {
    const userRole = await userRoleService.getUserRoleById(userRoleId);
    res.json(userRole);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/add', async (req, res) => {
  const userRole = req.body;
  try {
    const savedUserRole = await userRoleService.saveOrUpdateUserRole(userRole);
    res.json(savedUserRole);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const userRoleId = req.params.id;
  try {
    await userRoleService.deleteUserRole(userRoleId);
    res.json({ message: 'User role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
