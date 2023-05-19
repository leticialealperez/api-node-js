import * as bcrypt from 'bcrypt';

export async function gerarHash(textoSimples) {

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));

    return await bcrypt.hash(textoSimples, salt);

}

export async function comparar(textoSimples, hashAComparar) {
    return await bcrypt.compare(textoSimples, hashAComparar);
}