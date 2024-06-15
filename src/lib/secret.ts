"use server";
import CryptoJS from 'crypto-js';
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SECRET_KEY as string;
const key = new TextEncoder().encode(secretKey);

/**
 * The function encrypts a given string using AES encryption and a secret key.
 * @param {string} data - The `data` parameter is the string that you want to encrypt.
 * @returns The encrypted data as a string.
 */
export const encrypt = async (data: string) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

/**
 * The function decrypts a given string using AES encryption with a secret key.
 * @param {string} data - The `data` parameter is a string that represents the encrypted data that you
 * want to decrypt.
 * @returns The decrypted data as a string.
 */
export const decrypt = async (data: string) => {
    const dataString = CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
    return dataString;
}

export async function encryptJWT(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10 sec from now")
        .sign(key);
}

export async function decryptJWT(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}