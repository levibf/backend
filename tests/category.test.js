const request = require('supertest');
const app = require('../app'); // Importe o app da sua aplicação

describe('GET /v1/categories', () => {
    it('Deve listar todas as categorias cadastradas', async () => {
        const response = await request(app)
            .get('/v1/categories')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array); // Verifica se o retorno é um array
        expect(response.body.length).toBeGreaterThan(0); // Verifica se há pelo menos uma categoria
        // Aqui você pode adicionar outras verificações conforme a estrutura das categorias
        // Exemplo:
        // expect(response.body[0]).toHaveProperty('id');
        // expect(response.body[0]).toHaveProperty('name');
    }, 10000);
});
