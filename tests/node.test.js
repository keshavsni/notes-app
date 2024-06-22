const request = require('supertest');
const fs = require('fs-extra');
const path = require('path');
const app = require('../src/app');
const notesDir = path.join(__dirname, '../notes');

describe('Notes API', () => {
    beforeEach(async () => {
        await fs.emptyDir(notesDir);
    });

    it('should create a new note', async () => {
        const response = await request(app)
            .post('/notes')
            .send({ title: 'Test Note', content: 'This is a test note' });
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.equal('Test Note');
        expect(response.body.content).to.equal('This is a test note');
    });

    // Add more tests for other endpoints...

});
