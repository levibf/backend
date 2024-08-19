const request = require('supertest');
const app = require('../server');

let server;
// Inicializar o servidor
beforeAll(() => {
    server = app.listen(4000, () => console.log('Servidor iniciado para testes. Disponível na porta 4000')); // Ou a porta desejada
});

// Parar o servidor
afterAll(() => {
    server.close();
});

test('deve retornar a mensagem de boas-vindas', async () => {
    const response = await request(server).get('/');

    expect(response.status).toBe(200); // Verifica o status da resposta
    expect(response.body).toEqual({
        message: 'Bem-vindo a api do Cleitinho',
        version: '1.0.0',
        autor: 'Cleitinho'
    }); // Verifica o corpo da resposta
});
