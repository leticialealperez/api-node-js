export const validarDados = (request, response, next) => {
    const { email, senha } = request.body;

    if (!email || !senha) {
        return response.status(400).json({ message: 'Dados inválidos. É preciso informar email e senha para cadastrar um usuário.' });
    }

    if (!email.includes('@') || !email.includes('.com')) {
        return response.status(400).json({ message: 'Dados inválidos. É preciso informar um email válido.' });
    }

    if (senha.length < 6) {
        return response.status(400).json({ message: 'Dados inválidos. É preciso informar uma senha com, no mínimo, 6 caracteres.' });
    }

    return next();
};