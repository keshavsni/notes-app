const express = require('express');
const { createNote, getNote, updateNote, deleteNote, listNotes } = require('./controllers');
const { validateNote, validateNoteId } = require('./validators');
const { route } = require('./app');
const router = express.Router();


router.post('/', validateNote, createNote);
router.get('/:id', validateNoteId, getNote);
router.put('/:id', validateNoteId, validateNote, updateNote);
router.delete('/:id', validateNoteId, deleteNote);
router.get('/', listNotes);

module.exports = router;
