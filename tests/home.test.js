const app = require('../src/server');
const request = require('supertest');

let server

beforeAll(async () => {
    server = await app.listen(3002)
})
afterAll(async () => {
    server.close()
})

test('deve retornar a mensagem de boas-vindas', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200); // Verifica o status da resposta
    expect(response.body).toEqual({
        message: 'Bem-vindo',
    }); // Verifica o corpo da resposta
});