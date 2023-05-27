import { v4 as gerarId } from 'uuid';
import { contatos } from "../../database/contatos.js";
import { validaEnvioDadosObrigatorios } from "./middlewares/valida-envio-dados-obrigatorios.js";
import { validaID } from "./middlewares/valida-id.js";
import { validaUsuarioAutenticado } from "./middlewares/valida-usuario-autenticado.js";

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
    rotiador.get('/users/:emailUser/contatos/listar', (request, response) => {
        // PARAMS => parametros da rota
        const parametro = request.params;

        const recadosUsuarioLogado = contatos.filter((contato) => contato.criadoPor === parametro.emailUser)

        //  query params => FILTRAGEM
        const queryParametro = request.query;

        const pagina = Number(queryParametro.pagina) || 1 // testa se .pagina existe para usar o seu valor, caso contrário atribui o valor 1 à variavel

        const limite = 5;

        const totalPaginas = Math.ceil(recadosUsuarioLogado.length / limite) //

        const indice = (pagina - 1) * limite

        const aux = [...recadosUsuarioLogado] // ... spread => copia todos os registros da variavel

        const resultado = aux.splice(indice, limite) // [0, 1, 2, 3, 4]


        // 1 pagina => 0 ... 4 => total 5 => (1 - 1) * 5 => 0 indice de inicio do corte
        // 2 pagina => 5 .... 9 => total 5 => (2 - 1) * 5 => 5 indice de inicio do corte
        // 3 pagina => 10 ... 14 => total 5 => (3 - 1) * 5 => 10 indice de inicio do corte
        // 4 pagina => 15 ... 19 => total 5 => (4 - 1) * 5 => 15 indice de inicio do corte
        // 5 pagina => 20 ... 24 => total 5 => (5 - 1) * 5 => 20 indice de inicio do corte

        return response.status(201).json({
            sucesso: true,
            paginaAtual: pagina,
            totalRegistros: recadosUsuarioLogado.length,
            totalPaginas: totalPaginas,
            mensagem: `Contatos do usuário ${parametro.emailUser} listados com sucesso!`,
            dados: resultado,
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

