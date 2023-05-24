import { v4 as gerarId } from 'uuid';
import { contatos } from "../../database/index.js";
import { validaEnvioDadosObrigatorios, validaID, validaUsuarioAutenticado } from "./middlewares/index.js";

const rotasContatos = (rotiador) => {
    // CADASTRO
    rotiador.post('/contatos/criar', validaUsuarioAutenticado, validaEnvioDadosObrigatorios, (request, response) => {
        const usuarioLogado = request.usuarioLogado;
        const { nome, telefone, email } = request.body;

        const novoContato = {
            id: gerarId(),
            nome,
            telefone,
            email,
            criadoPor: usuarioLogado
        }

        contatos.push(novoContato);

        return response.status(201).json({
            sucesso: true,
            dados: novoContato,
            mensagem: 'Contato criado com sucesso!',
        });
    });

    // LISTAGEM
    rotiador.get('/contatos/listar', validaUsuarioAutenticado, (request, response) => {
        const usuarioLogado = request.usuarioLogado;

        const recadosUsuarioLogado = contatos.filter((contato) => contato.criadoPor === usuarioLogado)

        return response.status(201).json({
            sucesso: true,
            dados: recadosUsuarioLogado,
            mensagem: 'Contatos do usuário listados com sucesso!',
        });
    });

    // ATUALIZAÇÃO
    rotiador.put('/contatos/atualizar/:id', validaUsuarioAutenticado, validaID, (request, response) => {
        const usuarioLogado = request.usuarioLogado;
        const { id } = request.params;
        const { nome, telefone, email } = request.body;

        const indiceAtualizar = contatos.findIndex((contato) => contato.criadoPor === usuarioLogado && contato.id === id)

        const contatoAntigo = recadosUsuarioLogado[indiceAtualizar];

        const contatoAtualizado = {
            ...contatos[indiceAtualizar],
            nome: nome ?? contatoAntigo.nome,
            telefone: telefone ?? contatoAntigo.telefone,
            email: email ?? contatoAntigo.email
        }

        contatos[indiceAtualizar] = contatoAtualizado;

        return response.status(201).json({
            sucesso: true,
            dados: contatoAtualizado,
            mensagem: 'Contato atualizado com sucesso!',
        });
    });

    // EXCLUSÃO
    rotiador.delete('/contatos/deletar/:id', validaUsuarioAutenticado, validaID, (request, response) => {
        const usuarioLogado = request.usuarioLogado;
        const { id } = request.params;

        const indiceExcluir = contatos.findIndex((contato) => contato.criadoPor === usuarioLogado && contato.id === id)

        contatos.splice(indiceExcluir, 1)

        return response.status(201).json({
            sucesso: true,
            dados: contatos,
            mensagem: 'Contato excluido com sucesso!',
        });
    });

};

export default rotasContatos;

