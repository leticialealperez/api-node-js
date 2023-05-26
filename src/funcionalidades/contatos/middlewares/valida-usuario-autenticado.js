import { usuarios } from "../../../database/usuarios.js";
import { decifrar } from "../../../utilitarios/config-jwt-token.js";

export function validaUsuarioAutenticado(request, response, next) {
    const authorization = request.headers['authorization'];

    if (!authorization) {
        return response.status(401).json({
            sucesso: false,
            dados: null,
            mensagem: 'Você precisa estar autenticado.',
        });
    };

    const [, token] = authorization.split(' ');

    if (!token) {
        return response.status(401).json({
            sucesso: false,
            dados: null,
            mensagem: 'Você precisa estar autenticado. Informe o token no cabeçalho da requisição.',
        });
    };

    try {
        const { idUsuario } = decifrar(token);

        const usuario = usuarios.find((usuario) => usuario.id === idUsuario)

        request.usuarioLogado = usuario.email;

        return next();
    } catch {
        return response.status(401).json({
            sucesso: false,
            dados: null,
            mensagem: 'Você precisa estar autenticado. Token inválido!.',
        });
    }

}