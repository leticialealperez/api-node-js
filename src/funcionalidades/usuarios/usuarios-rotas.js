import { v4 as gerarId } from 'uuid';
import { usuarios } from '../../database/index.js';
import { encriptar, gerarHash } from '../../utilitarios/index.js';
import { validarDadosCadastro, validarDadosLogin, validarEmailExistente } from './middlewares/index.js';

const rotasUsuarios = (rotiador) => {
    // CADASTRO
    rotiador.post('/usuarios/cadastro', validarDadosCadastro, validarEmailExistente, async (request, response) => {
        const { email, senha } = request.body;

        const hashSenha = await gerarHash(senha);

        const novoUsuario = {
            id: gerarId(),
            email: email,
            senha: hashSenha,
        }

        usuarios.push(novoUsuario);

        console.log(usuarios);

        return response.status(201).json({
            sucesso: true,
            dados: novoUsuario,
            mensagem: 'Usuário criado com sucesso.',
        });
    });

    // LOGIN
    rotiador.post('/usuarios/login', validarDadosLogin, (request, response) => {
        const { email, senha } = request.body;

        const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email);

        const token = encriptar({ idUsuario: usuarioEncontrado.id });

        return response.status(201).json({
            sucesso: true,
            dados: {
                email: usuarioEncontrado.email,
                token: token
            },
            mensagem: 'Login autorizado. Utilize o token gerado',
        });
    });
};

export default rotasUsuarios;

