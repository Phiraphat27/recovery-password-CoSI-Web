"use server"

import prisma from '@/lib/prisma';
import { generator_id, isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { listSessionData } from '@/type/sessionData';
import { decryptJWT } from '@/lib/secret';
import { TwoFactorData } from '@/type/two-factor';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export async function getDataSession() {
    const sessionToken = cookies().get("session")?.value as string;
    const lang = cookies().get("NEXT_LOCALE")?.value as string;
    const dataResponse: listSessionData[] = [];

    if (!sessionToken) {
        return null;
    }

    const dataUser = await decryptJWT(sessionToken);

    const sessions = await prisma.session.findMany({
        where: {
            userId: dataUser.user.user_id,
        },
    });

    await Promise.all(sessions.map(async (session) => {
        if (typeof session.lat === 'number' && typeof session.lon === 'number') {
            const { id, userId, expires, lat, lon, ...sessionData } = session;
            const isCurrent = session.sessionToken === sessionToken;

            if (session.lat === 0 && session.lon === 0) {
                dataResponse.push({ ...sessionData, isCurrent, location: { city: "Unknown", country: "Unknown" } });
                return;
            }

            const dataGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${session.lat}&longitude=${session.lon}&localityLanguage=${lang}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());


            dataResponse.push({ ...sessionData, isCurrent, location: { city: dataGeo.principalSubdivision, country: dataGeo.countryName } });
        }
    }));

    return dataResponse;
}

export async function editTwoauth(data: { auth_app?: string; email?: string, enable?: boolean }) {
    const sessionToken = cookies().get("session")?.value as string;
    const dataUser = await decryptJWT(sessionToken);
    if (data.enable !== undefined || data.enable !== null) {

        await prisma.two_factor.update({
            where: { user_id: dataUser.user.user_id },
            data: {
                enable: data.enable,
            }
        }).catch(async () => {
            await prisma.two_factor.create({
                data: {
                    user_id: dataUser.user.user_id,
                    email: "",
                    auth_app: "",
                    enable: data.enable as boolean
                }
            })
        })
    }

    if (data.email) {
        await prisma.two_factor.update({
            where: { user_id: dataUser.user.user_id },
            data: { email: data.email },
        }).catch(async () => {
            await prisma.two_factor.create({
                data: {
                    user_id: dataUser.user.user_id,
                    email: data.email as string,
                    auth_app: "",
                    enable: data.enable as boolean
                },
            });
        });
    }

    if (data.auth_app) {
        await prisma.two_factor.update({
            where: { user_id: dataUser.user.user_id },
            data: { auth_app: data.auth_app },
        }).catch(async () => {
            await prisma.two_factor.create({
                data: {
                    user_id: dataUser.user.user_id,
                    email: "",
                    auth_app: data.auth_app as string,
                    enable: data.enable as boolean
                }
            })
        });
    }

    return { Success: true };
}

export async function getTwoauth() {
    const sessionToken = cookies().get("session")?.value as string;
    const dataUser = await decryptJWT(sessionToken);

    const response = await prisma.two_factor.findFirst({
        where: {
            user_id: dataUser.user.user_id,
        },
    });

    if (!response) {
        return {
            email: "",
            auth_app: "",
            enable: false,
        };
    }

    const { user_id, secret_app, ...data } = response;

    return data as TwoFactorData
}

export async function createAppAuth() {
    const sessionToken = cookies().get("session")?.value;
    if (!sessionToken) throw new Error("Session token not found");

    const dataUser = await decryptJWT(sessionToken);

    const temp_secret = speakeasy.generateSecret();
    const otpauthUrl = speakeasy.otpauthURL({
        secret: temp_secret.base32,
        label: `CoSI Lab : ${dataUser.user.user_email}`, // Adjust label as needed
        // issuer: 'CoSI Lab', // Adjust issuer as needed
    });

    temp_secret.otpauth_url = otpauthUrl; // Attach otpauth_url to the secret

    try {
        await prisma.two_factor.upsert({
            where: { user_id: dataUser.user.user_id },
            update: { auth_app: otpauthUrl, secret_app: JSON.stringify(temp_secret) },
            create: {
                user_id: dataUser.user.user_id,
                email: dataUser.user.email,
                secret_app: JSON.stringify(temp_secret),
                auth_app: otpauthUrl,
                enable: false
            }
        });
    } catch (error) {
        console.error("Error upserting two_factor record:", error);
        throw error;
    }

    try {
        const dataUrl = await QRCode.toDataURL(otpauthUrl);
        return dataUrl;
    } catch (error) {
        console.error("Error generating QR code:", error);
        throw error;
    }
}

export async function getAppAuth() {
    const sessionToken = cookies().get("session")?.value;
    if (!sessionToken) throw new Error("Session token not found");

    const dataUser = await decryptJWT(sessionToken);

    let response;
    try {
        response = await prisma.two_factor.findFirst({
            where: { user_id: dataUser.user.user_id },
        });
    } catch (error) {
        console.error("Error finding two_factor record:", error);
        return createAppAuth();
    }

    if (!response?.auth_app || response?.auth_app == "") return createAppAuth();

    const secret = JSON.parse(response.secret_app ?? "{}");

    try {
        const dataUrl = await QRCode.toDataURL(secret.otpauth_url);
        return dataUrl;
    } catch (error) {
        console.error("Error generating QR code:", error);
        throw error;
    }
}

export async function verifyAppAuth(token: string) {
    const sessionToken = cookies().get("session")?.value as string;
    const dataUser = await decryptJWT(sessionToken);

    const response = await prisma.two_factor.findFirst({
        where: {
            user_id: dataUser.user.user_id,
        },
    });

    if (!response) {
        return false;
    }

    const verified = speakeasy.totp.verify({
        secret: response.auth_app ? JSON.parse(response.auth_app).temp_secret : null,
        encoding: "base32",
        token,
    });

    return verified;
}