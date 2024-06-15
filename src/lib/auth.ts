"use server";
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generator_id, isIdUniqueUser } from '@/lib/dbid';
import { encrypt, decrypt, encryptJWT, decryptJWT } from '@/lib/secret';
import { cookies } from 'next/headers';
import { sessionData } from '@/type/sessionData';

export async function registerUser(
    email: string,
    password: string,
    name: string,
    permission: string,
    position: string,
) {
    const hashedPassword = await encrypt(password);
    return await prisma.user.create({
        data: {
            user_email: email,
            user_password: hashedPassword,
            user_name: name,
            user_join: new Date(),
            user_id: await isIdUniqueUser(),
            user_image: '',
            user_profile: '',
            user_permission: permission,
            user_position: position,
        },
    });
}

export async function forgotPassword(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { user_email: email } });
    if (user) {
        const hashedPassword = await encrypt(password);
        await prisma.user.update({
            where: { user_id: user.user_id },
            data: { user_password: hashedPassword },
        });
        return user;
    }
    return null;
}

async function authenticateUser(email: string, password: string) {
    const user = await prisma.user.findFirst(
        {
            where: { user_email: email },
            select: {
                user_id: true,
                user_email: true,
                user_password: true,
                user_name: true,
                user_image: true,
                permission: {
                    select: { permission_name: true }
                },
                position: {
                    select: { position_name: true }
                },
                profile: {
                    select: {
                        name: true,
                        language_code: true,
                    }
                }
            }
        }
    );

    if (user && await decrypt(user.user_password) === password) {
        const { user_password, ...userData } = user;
        return userData;
    }
    return null;
}

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const user = await authenticateUser(email, password);

    if (!user) {
        return { Error: "Invalid Email or Password" };
    }
    const sessionToken = await createSession(user as sessionData);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("session", sessionToken, { expires, httpOnly: true }); // 7 days
    return { Success: true };
}

export async function createSession(user: sessionData) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const sessionToken = await encryptJWT({ user, expires });
    const session = await prisma.session.create({
        data: {
            sessionToken,
            userId: user.user_id,
            expires: expires, // 7 days
        },
    });
    return session.sessionToken;
}

export async function getSession(): Promise<any> {
    const sessionToken = cookies().get("session");
    return await decryptJWT(sessionToken?.value as string);
    // const session = await prisma.session.findUnique({
    //     where: { sessionToken },
    //     include: { user: true },
    // });
    // if (session && session.expires > new Date()) {
    //     return session.user;
    // }
    return null;
}

export async function deleteSession(sessionToken: string) {
    return await prisma.session.delete({ where: { sessionToken } });
}
