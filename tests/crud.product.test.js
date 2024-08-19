describe('POST /v1/products', () => {
    it('Deve criar um novo produto', async () => {
        const newProduct = {
            name: 'Produto Teste',
            price: 99.99,
            category: 'Categoria Teste'
        };

        const response = await request(app)
            .post('/v1/products')
            .send(newProduct)
            .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(201); // Status de criação bem-sucedida
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newProduct.name);
        expect(response.body.price).toBe(newProduct.price);
        expect(response.body.category).toBe(newProduct.category);
    }, 10000);
});
describe('GET /v1/products/:id', () => {
    it('Deve recuperar um produto existente', async () => {
        const productId = 1; // Supondo que o produto com ID 1 exista

        const response = await request(app)
            .get(`/v1/products/${productId}`)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', productId);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('price');
        expect(response.body).toHaveProperty('category');
    }, 10000);
});
describe('PUT /v1/products/:id', () => {
    it('Deve atualizar um produto existente', async () => {
        const productId = 1; // Supondo que o produto com ID 1 exista
        const updatedProduct = {
            name: 'Produto Atualizado',
            price: 89.99,
            category: 'Categoria Atualizada'
        };

        const response = await request(app)
            .put(`/v1/products/${productId}`)
            .send(updatedProduct)
            .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', productId);
        expect(response.body.name).toBe(updatedProduct.name);
        expect(response.body.price).toBe(updatedProduct.price);
        expect(response.body.category).toBe(updatedProduct.category);
    }, 10000);
});
describe('DELETE /v1/products/:id', () => {
    it('Deve excluir um produto existente', async () => {
        const productId = 1; // Supondo que o produto com ID 1 exista

        const response = await request(app)
            .delete(`/v1/products/${productId}`)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(204); // Status de exclusão bem-sucedida

        // Verificar se o produto foi realmente removido
        const getResponse = await request(app)
            .get(`/v1/products/${productId}`)
            .set('Accept', 'application/json');

        expect(getResponse.statusCode).toBe(404); // Espera-se que o produto não seja encontrado
    }, 10000);
});
describe('DELETE /v1/products/:id', () => {
    it('Deve excluir um produto existente', async () => {
        const productId = 1; // Supondo que o produto com ID 1 exista

        const response = await request(app)
            .delete(`/v1/products/${productId}`)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(204); // Status de exclusão bem-sucedida

        // Verificar se o produto foi realmente removido
        const getResponse = await request(app)
            .get(`/v1/products/${productId}`)
            .set('Accept', 'application/json');

        expect(getResponse.statusCode).toBe(404); // Espera-se que o produto não seja encontrado
    }, 10000);
});
