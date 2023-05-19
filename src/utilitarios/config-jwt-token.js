import jwt from 'jsonwebtoken';

export function encriptar(credencial) {
    return jwt.sign(credencial, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIREIN });
}

export function decifrar(textoCriptografado) {
    return jwt.verify(textoCriptografado, process.env.JWT_SECRET);
}