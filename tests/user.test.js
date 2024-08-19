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

    // it('Deve retornar 400 se o email ou senha estiverem incorretos', async () => {
    //     const response = await request(app)
    //         .post('/v1/user/token')
    //         .send({
    //             "email": 'user@mail.com',
    //             "password": 'senha_errada',
    //         });

    //     expect(response.statusCode).toBe(400);
    //     expect(response.body).toHaveProperty('message', 'Email ou senha incorretos.');
    // });
});
