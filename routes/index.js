var express = require('express');
var router = express.Router();
var entriesController = require('../controllers/entries');

router.get('/entries', entriesController.renderEntriesIndex);

// Render new view page
router.get('/entries/new', entriesController.renderEntriesNew);

// Show an entry
router.get('/entries/:id', entriesController.renderEntriesShow);

// Create new entry
router.post('/entries', entriesController.renderEntriesCreate);

// Edit an entry
router.get('/entries/:id/edit', entriesController.renderEntriesEdit);

// Update an entry
router.put('/entries/:id', entriesController.renderEntriesUpdate);

// Destroy an entry
router.delete('/entries/:id', entriesController.renderEntriesDelete);

