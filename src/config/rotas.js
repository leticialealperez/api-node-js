import express from 'express';
import rotasContatos from '../funcionalidades/contatos/contatos-rotas.js';
import rotasUsuarios from '../funcionalidades/usuarios/usuarios-rotas.js';
import paginaApresentacaoApi from './pagina-apresentacao-api.js';

const rotasApi = (app) => {
    const router = express.Router();

    app.use('/api', router);
    router.get('/', (request, response) => response.send(paginaApresentacaoApi));

    // rotas da aplicação/funcionalidades
    rotasUsuarios(router);
    rotasContatos(router);
};

export default rotasApi


