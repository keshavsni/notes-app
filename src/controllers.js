const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const notesDir = path.join(__dirname, '../notes');

async function createNote (req, res) {
    const { title, content } = req.body;
    const id = uuidv4();
    const note = { id, title, content };

    try {
        await fs.outputJson(path.join(notesDir, `${id}.json`), note);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Could not create note' });
    }
}

async function getNote (req, res) {
    const { id } = req.params;
    try {
        const note = await fs.readJson(path.join(notesDir, `${id}.json`));
        res.status(200).json(note);
    } catch (error) {
        res.status(404).json({ error: 'Note not found' });
    }
}

async function updateNote (req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = { id, title, content };

    try {
        await fs.outputJson(path.join(notesDir, `${id}.json`), updatedNote);
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Could not update note' });
    }
}

async function deleteNote (req, res) {
    const { id } = req.params;

    try {
        await fs.remove(path.join(notesDir, `${id}.json`));
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Could not delete note' });
    }
}

async function listNotes (req, res) {
        const { page = 1, limit = 10 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
    try {
        
        const files = await fs.readdir(notesDir);
        const notes = await Promise.all(files.map(async (file) => {
            const note = await fs.readJson(path.join(notesDir, file));
            return note;
        }));

        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const paginatedNotes = notes.slice(startIndex, endIndex);

        res.status(200).json({
            page: pageNum,
            limit: limitNum,
            totalNotes: notes.length,
            totalPages: Math.ceil(notes.length / limitNum),
            notes: paginatedNotes
        });
    } catch (error) {
        res.status(500).json({ error: 'Could not list notes' });
    }
}

module.exports = { createNote, getNote, updateNote, deleteNote, listNotes };
