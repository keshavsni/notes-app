const { check, validationResult } = require('express-validator');

const validateNote = [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('content').not().isEmpty().withMessage('Content is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateNoteId = [
    check('id').isUUID().withMessage('Invalid note ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateNote, validateNoteId };
