import { usuarios } from '../../../database/usuarios.js';

export const validarEmailExistente = (request, response, next) => {
    const { email } = request.body;

    const existe = usuarios.some((usuario) => usuario.email === email);

    if (existe) {
        return response.status(400).json({
            sucesso: false,
            dados: null,
            mensagem: 'Este e-mail já está sendo usado por outro usuário.',
        });
    }

    return next();
};