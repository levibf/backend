// src/tests/category.test.js

const adicionarCategoria = require('../services/categoryServices');
const database = require('../config/database');  // Caminho correto para o módulo de banco de dados

// Simule o banco de dados
jest.mock('../config/database');  // Caminho correto para o módulo de banco de dados

beforeAll(async () => {
  // Se necessário, configure o banco de dados de teste aqui
  // Exemplo: await database.connect();
});

beforeEach(() => {
  // Limpe a simulação do banco de dados antes de cada teste
  database.insert.mockClear();
});

afterAll(async () => {
  // Se necessário, desconecte-se do banco de dados de teste aqui
  // Exemplo: await database.disconnect();
});

test('deve adicionar uma categoria corretamente', async () => {
  // Simule o resultado esperado do banco de dados
  database.insert.mockResolvedValue({ id: 1, nome: 'Categoria Teste' });

  const resultado = await adicionarCategoria('Categoria Teste');

  // Verifique se o método de banco de dados foi chamado com os parâmetros corretos
  expect(database.insert).toHaveBeenCalledWith('categorias', { nome: 'Categoria Teste' });

  // Verifique se o resultado é o esperado
  expect(resultado).toEqual({ id: 1, nome: 'Categoria Teste' });
});

test('não deve adicionar uma categoria sem nome', async () => {
  await expect(adicionarCategoria('')).rejects.toThrow('Nome da categoria é obrigatório');
});
