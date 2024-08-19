const request = require('supertest');
const app = require('../app'); // Importe o app da sua aplicação

describe('Testes de Categorias', () => {
    
    let createdCategoryId; // Para armazenar o ID da categoria criada durante o teste

    // Teste de Criação de Novo Registro
    describe('POST /v1/categories', () => {
        it('Deve criar uma nova categoria', async () => {
            const newCategory = {
                name: 'Categoria Teste',
                description: 'Descrição da categoria de teste'
            };

            const response = await request(app)
                .post('/v1/categories')
                .send(newCategory)
                .set('Content-Type', 'application/json');

            expect(response.statusCode).toBe(201); // Status de criação bem-sucedida
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newCategory.name);
            expect(response.body.description).toBe(newCategory.description);

            createdCategoryId = response.body.id; // Salva o ID para testes subsequentes
        }, 10000);
    });

    // Teste de Leitura de Registros
    describe('GET /v1/categories/:id', () => {
        it('Deve recuperar uma categoria existente', async () => {
            const response = await request(app)
                .get(`/v1/categories/${createdCategoryId}`)
                .set('Accept', 'application/json');

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id', createdCategoryId);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('description');
        }, 10000);
    });

    // Teste de Atualização de Registro
    describe('PUT /v1/categories/:id', () => {
        it('Deve atualizar uma categoria existente', async () => {
            const updatedCategory = {
                name: 'Categoria Atualizada',
                description: 'Descrição atualizada da categoria'
            };

            const response = await request(app)
                .put(`/v1/categories/${createdCategoryId}`)
                .send(updatedCategory)
                .set('Content-Type', 'application/json');

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id', createdCategoryId);
            expect(response.body.name).toBe(updatedCategory.name);
            expect(response.body.description).toBe(updatedCategory.description);
        }, 10000);
    });

    // Teste de Exclusão de Registro
    describe('DELETE /v1/categories/:id', () => {
        it('Deve excluir uma categoria existente', async () => {
            const response = await request(app)
                .delete(`/v1/categories/${createdCategoryId}`)
                .set('Accept', 'application/json');

            expect(response.statusCode).toBe(204); // Status de exclusão bem-sucedida

            // Verificar se a categoria foi realmente removida
            const getResponse = await request(app)
                .get(`/v1/categories/${createdCategoryId}`)
                .set('Accept', 'application/json');

            expect(getResponse.statusCode).toBe(404); // Espera-se que a categoria não seja encontrada
        }, 10000);
    });

    // Teste de Validação de Dados
    describe('POST /v1/categories', () => {
        it('Não deve criar uma categoria com dados inválidos', async () => {
            const invalidCategory = {
                description: 'Descrição inválida', // Falta o campo 'name'
            };

            const response = await request(app)
                .post('/v1/categories')
                .send(invalidCategory)
                .set('Content-Type', 'application/json');

            expect(response.statusCode).toBe(400); // Status de erro de validação
            expect(response.body).toHaveProperty('error');
        }, 10000);
    });

    // Teste de Erro de Registro Não Encontrado
    describe('GET /v1/categories/:id', () => {
        it('Deve retornar um erro para uma categoria não encontrada', async () => {
            const invalidCategoryId = 999; // Supondo que a categoria com ID 999 não exista

            const response = await request(app)
                .get(`/v1/categories/${invalidCategoryId}`)
                .set('Accept', 'application/json');

            expect(response.statusCode).toBe(404); // Status de não encontrado
            expect(response.body).toHaveProperty('error');
        }, 10000);
    });
});
