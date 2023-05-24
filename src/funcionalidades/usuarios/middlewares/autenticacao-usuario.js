import { usuarios } from '../../../database/index.js';

export const validarDadosLogin = async (request, response, next) => {
    const { email, senha } = request.body;

    const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email);

    if (!usuarioEncontrado) {
        return response.status(404).json({
            sucesso: false,
            dados: null,
            mensagem: 'E-mail ou senha incorretos.',
        });
    }

    const senhaCorreta = await comparar(senha, usuarioEncontrado.senha);

    if (!senhaCorreta) {
        return response.status(404).json({
            sucesso: false,
            dados: null,
            mensagem: 'E-mail ou senha incorretos.',
        });
    }

    return next();
};