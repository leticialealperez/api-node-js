import * as bcrypt from 'bcrypt';

export function gerarHash(textoSimples) {
    return bcrypt.genSalt(Number(process.env.BCRYPT_SALT)).then((salt) => {
        return bcrypt.hash(textoSimples, salt)
    }).then((hash) => {
        return hash
    });

}

export async function comparar(textoSimples, hashAComparar) {
    return await bcrypt.compare(textoSimples, hashAComparar);
}