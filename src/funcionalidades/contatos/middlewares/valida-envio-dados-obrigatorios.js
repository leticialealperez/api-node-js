
export function validaEnvioDadosObrigatorios(request, response, next) {
    const { nome, email, telefone } = request.body;

    if (!nome || !email || !telefone) {
        console.log(nome)
        console.log(email)
        console.log(telefone)
        return response.status(401).json({
            sucesso: false,
            dados: null,
            mensagem: 'É obrigatório informar nome, email e telefone.',
        });
    }

    if (!email.includes('@') || !email.includes('.com')) {
        return response.status(401).json({
            sucesso: false,
            dados: null,
            mensagem: 'Informe um e-mail válido.',
        });
    }

    if (telefone.length !== 14) {
        return response.status(401).json({
            sucesso: false,
            dados: null,
            mensagem: 'Informe um telefone válido. No formato (51)99988-7766.',
        });
    }

    return next();
}

