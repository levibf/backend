const request = require('supertest');
const app = require('../src/server');

describe('GET /v1/category', () => {
    it('Deve listar todas as categorias cadastradas', async () => {
        const response = await request(app)
            .get('/v1/category')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);
});
