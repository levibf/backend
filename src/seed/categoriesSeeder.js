
const faker = require('@faker-js/faker').faker;
const Categories = require('../models/category'); // ajuste o caminho conforme necessário

// Função para gerar dados de usuários
const generateUserData = () => {
    return {
        name: faker.commerce.department(), // Nome da categoria
        slug: faker.helpers.slugify(faker.commerce.department().toLowerCase()), // Slug gerado a partir do nome da categoria
        use_in_menu: faker.datatype.boolean(), // Campo booleano para indicar se a categoria deve ser exibida no menu
    };
};

// Função para criar múltiplos usuários
const createSampleCategories = async (numCategories) => {
    try {
        for (let i = 0; i < numCategories; i++) {
            const userData = generateUserData();
            await Categories.create(userData);
            console.log(`Usuário criado: ${userData.name}`);
        }
        console.log('Todos as categorias foram criados com sucesso!');
    } catch (error) {
        console.error('Erro ao criar usuários:', error);
    }
};

// Chamar a função para criar 12 categorias de exemplo
createSampleCategories(12);
