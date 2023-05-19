import { decifrar } from "../../../utilitarios";

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


    const { idUsuario } = decifrar(token);

    if (!idUsuario) {
        return response.status(401).json({
            sucesso: false,
            dados: null,
            mensagem: 'Você precisa estar autenticado. Token inválido!.',
        });
    }

    request.usuarioLogado = idUsuario;

    return next();
}