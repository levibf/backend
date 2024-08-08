// arquivo UsuariosServices.js
const bcrypt = require('bcrypt');
const Usuario = require('../models/UsuarioModel');

const updateUsuario = async (req, res) => {
  try {
    const { id, senha } = req.body;

    if (!id || !senha) {
      return res.status(400).json({ error: 'ID e senha são obrigatórios.' });
    }

    // Criação do salt e hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    // Atualização do usuário
    const usuarioAtualizado = await Usuario.update(
      { senha: hashedSenha },
      { where: { id } } // Supondo que você esteja usando um ID para localizar o usuário
    );

    if (!usuarioAtualizado[0]) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

module.exports = {
  updateUsuario
};

