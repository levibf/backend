# Backend
**Projeto de backend da Digital College**

# Equipe:
- Johny
- Levi
- Misael
- Nicolas

# Escopo do Projeto
- **Node.js**: Executa JavaScript no servidor.
- **Express.js**: Criação de rotas de API.
- **Dotenv**: Gerencia configurações de forma segura.
- **Nodemon**: Aumenta a produtividade no desenvolvimento.
- **MySQL**: Persistência de dados.
- **Sequelize**: Facilita o trabalho com o banco de dados.
- **JWT**: Segurança e controle de acesso nas rotas de API.
- **JEST**: Testes e garantia da qualidade do código.

# Instalação

### Pré-requisitos
- **Node.js** (versão v20.15.1 ou superior)
- **MySQL** (versão ^3.11.0 ou superior
- **Git**

### Passos de Instalação
```bash
# Clone o repositório
git clone https://github.com/levibf/backend.git

# Acesse o diretório do projeto
cd backend

# Instale as dependências
npm install

# Configure o arquivo .env
cp .env
```

### Configuração do `.env`
```env
DB_ENV=test

# Configuração para produção (Railway 1)
DB_HOST_PROD=monorail.proxy.rlwy.net
DB_PORT_PROD=56321
DB_NAME_PROD=railway
DB_USER_PROD=root
DB_PASSWORD_PROD=XowovCXFTKLJzjvpdUHuCHAMkVDsNtLE

# Configuração para teste (Railway 2)
DB_HOST_TEST=localhost
DB_PORT_TEST=3306
DB_NAME_TEST=new_schema2
DB_USER_TEST=root
DB_PASSWORD_TEST=1234

JWT_SECRET=7a9d3f8b2c1e6d5a4b0e8f7c6d2a1b9e
```

# Estrutura de Diretórios
```
project-root/
├── src/                      # Diretório principal que contém todo o código-fonte da aplicação
│   ├── config/               # Arquivos de configuração (ex.: banco de dados, variáveis de ambiente)
│   ├── controllers/          # Lógica das rotas, manipulando as requisições e respostas
│   ├── middleware/           # Middlewares para autenticação, manipulação de erros e outras funções intermediárias
│   ├── models/               # Definições dos modelos Sequelize, representando as tabelas do banco de dados
│   ├── routes/               # Definição das rotas da API, mapeando URLs para controllers específicos
│   ├── services/             # Lógica de negócios e operações complexas que não pertencem aos controllers
│   ├── app.js                # Configuração e inicialização do aplicativo Express, incluindo middlewares e rotas
│   └── server.js             # Inicialização do servidor, responsável por ligar o app na porta especificada
├── tests/                    # Testes unitários e de integração, organizados de acordo com os componentes que testam
├── .env                      # Arquivo de configuração de variáveis de ambiente (ex.: credenciais, portas)
├── .gitignore                # Arquivo que especifica quais arquivos/diretórios devem ser ignorados pelo Git
└── package.json              # Arquivo que gerencia as dependências e scripts do projeto

```

# Fluxo de Autenticação JWT
1. Usuário faz login enviando credenciais.
2. Servidor verifica as credenciais e, se corretas, gera um JWT.
3. JWT é retornado ao cliente e deve ser enviado em requisições subsequentes.
4. O middleware de autenticação verifica a validade do JWT para permitir o acesso a rotas protegidas.

# Rotas da API

### POST /api/login
- **Descrição**: Autentica o usuário e retorna um JWT.
- **Parâmetros**: 
  ```json
  {
    "email": "user@example.com",
    "password": "123456"
  }
  ```
- **Exemplo de resposta**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

# Testes

```bash
npm test
```

### Estrutura dos Testes
- **Testes Unitários**: Validam funcionalidades específicas e pequenas partes do código.
- **Testes de Integração**: Verificam a interação entre diferentes módulos do sistema.

# Rodar a Aplicação
```bash
npm start
```
Isso iniciará o servidor Node.js e conectará ao banco de dados MySQL usando as credenciais fornecidas.

# Documentação Postman
[Link para a Documentação](https://equipe-de-back.postman.co/workspace/Equipe-de-Back-Workspace~ddd28954-df55-4cb4-8fce-e05720145d31/collection/37358673-7db39b86-a15c-4cbc-92a7-132a115538a7?action=share&creator=37358673)

# Contribuição
1. Faça um fork do repositório.
2. Crie uma branch para sua feature/bugfix:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m 'Adicionei minha feature'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Crie um Pull Request.

# Licença
Este projeto está sob a licença XYZ. Consulte o arquivo `LICENSE` para mais detalhes.

---


