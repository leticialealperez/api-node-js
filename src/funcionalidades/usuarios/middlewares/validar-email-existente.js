import { usuarios } from '../../../database/index.js';

export const validarEmailExistente = (request, response, next) => {
    const { email } = request.body;

    const existe = usuarios.some((usuario) => usuario.email === email);

    if (existe) {
        return response.status(400).json({ message: 'Este e-mail já está cadastrado.' });
    }

    return next();
};