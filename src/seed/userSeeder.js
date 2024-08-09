
const faker = require('@faker-js/faker').faker;
const User = require('../models/user'); // ajuste o caminho conforme necessário

// Função para gerar dados de usuários
const generateUserData = () => {
    return {
        firstname: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(), // Nota: Considere usar bcrypt para hash de senhas reais
    };
};

// Função para criar múltiplos usuários
const createSampleUsers = async (numUsers) => {
    try {
        for (let i = 0; i < numUsers; i++) {
            const userData = generateUserData();
            await User.create(userData);
            console.log(`Usuário criado: ${userData.email}`);
        }
        console.log('Todos os usuários foram criados com sucesso!');
    } catch (error) {
        console.error('Erro ao criar usuários:', error);
    }
};

// Chamar a função para criar 7 usuários de exemplo
createSampleUsers(7);
