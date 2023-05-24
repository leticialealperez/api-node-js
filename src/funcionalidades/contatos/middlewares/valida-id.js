import { contatos } from "../../../database/index.js";

export function validaID(request, response, next) {
    const usuarioLogado = request.usuarioLogado;
    const { id } = request.params;

    const indiceAtualizar = contatos.findIndex((contato) => contato.criadoPor === usuarioLogado && contato.id === id)

    if (indiceAtualizar < 0) {
        return response.status(401).json({
            sucesso: false,
            dados: null,
            mensagem: 'O ID informado não corresponde a nenhum contato do usuário logado.',
        });
    }

    return next();
}