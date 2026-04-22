import jwt, { VerifyOptions } from 'jsonwebtoken';
import { JwtPayloadUser } from '../interfaces/authenticate.type';

/**
 * Signs a JWT token with ES512 (ECDSA with SHA-512) - the strongest available algorithm
 * @param payload The data to encode in the token
 * @param privateKey The private key for signing
 * @param expiresIn Token expiration time (default: 2h)
 * @returns Signed JWT token
 */
export const signJwt = (
    payload: JwtPayloadUser,
    privateKey: string,
    expiresIn: string | number = '2h'
): string => {
    const options: any = {
        algorithm: 'ES512',
        expiresIn
    };
    return jwt.sign(payload, privateKey, options);
};

/**
 * Verifies a JWT token with ES512 algorithm
 * @param token The token to verify
 * @param publicKey The public key for verification
 * @returns Decoded token or throws an error
 */
export const verifyJwt = (
    token: string,
    publicKey: string
): JwtPayloadUser => {
    const options: VerifyOptions = {
        algorithms: ['ES512']
    };
    return jwt.verify(token, publicKey, options) as JwtPayloadUser;
};





