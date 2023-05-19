import { validaUsuarioAutenticado } from "./middlewares";

const rotasContatos = (rotiador) => {
    // CADASTRO
    rotiador.post('/contatos/criar', validaUsuarioAutenticado, (request, response) => {
        const usuarioLogado = request.usuarioLogado;

        console.log(usuarioLogado);

        return response.status(201).json({
            sucesso: true,
            dados: usuarioLogado,
            mensagem: 'OK',
        });
    });

    // LISTAGEM



    // ATUALIZAÇÃO



    // EXCLUSÃO

};

export default rotasContatos;

