import { v4 as gerarId } from 'uuid';
import { usuarios } from '../../database/usuarios.js';
import { gerarHash } from '../../utilitarios/config-bcrypt.js';
import { encriptar } from '../../utilitarios/config-jwt-token.js';
import { validarDadosLogin } from './middlewares/autenticacao-usuario.js';
import { validarDadosCadastro } from './middlewares/valida-dados-cadastro.js';
import { validarEmailExistente } from './middlewares/validar-email-existente.js';

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

