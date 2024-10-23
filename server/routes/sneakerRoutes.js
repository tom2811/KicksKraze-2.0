const express = require('express');
const sneakerController = require('../controllers/sneakerController');

const router = express.Router();

// Sneaker routes
router.get('/brands', sneakerController.getBrands);
router.get('/', sneakerController.getAllSneakers);
router.get('/:id', sneakerController.getSneakerById);

// Add a test route
router.get('/test', (req, res) => {
  res.json({ message: 'Sneaker routes are working' });
});

module.exports = router;
