const request = require('supertest');
const app = require('../app'); // Importe o app da sua aplicação

describe('GET /v1/products', () => {
    it('Deve listar todos os produtos cadastrados', async () => {
        const response = await request(app)
            .get('/v1/products')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array); // Verifica se o retorno é um array
        expect(response.body.length).toBeGreaterThan(0); // Verifica se há pelo menos um produto
        // Aqui você pode adicionar outras verificações conforme a estrutura dos produtos
        // Exemplo: 
        // expect(response.body[0]).toHaveProperty('id');
        // expect(response.body[0]).toHaveProperty('name');
    }, 10000);
});
