const chai = require('chai');
const request = require('supertest');

const app = require('../app');
const expect = chai.expect;

describe('GET /items', () => {
    it('Should return list of items', async () => {
        const response = await request(app)
            .get('/items')
            .expect('Content-Type', /json/)
            .expect(200);

        const {body} = response;

        expect(body).to.be.an('array');
        expect(body).to.have.lengthOf(3);
    });
    // TODO: add tests for create/update/delete methods
});
