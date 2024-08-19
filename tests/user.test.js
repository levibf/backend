const request = require('supertest');
const app = require('../app'); // Importe o app da sua aplicação

describe('POST /v1/user/token', () => {
    it('Deve gerar um token JWT com email e senha corretos', async () => {
        const response = await request(app)
            .post('/v1/user/token')
            .send({
                "email": 'user212@mail.com',
                "password": '123@123',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    }, 10000);
});
