"use server";
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generator_id, isIdUniqueUser } from '@/lib/dbid';
import { encrypt, decrypt, encryptJWT } from '@/lib/secret';
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
                user_permission: true,
                user_position: true,
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

    const sessionToken = await createSession(user);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("session", sessionToken, { expires, httpOnly: true }); // 7 days
    return { Success: true };
}

export async function createSession(user: sessionData) {
    const sessionToken = await encryptJWT({ user });
    const session = await prisma.session.create({
        data: {
            sessionToken,
            userId: user.user_id,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
    });
    return session.sessionToken;
}

export async function getSession(sessionToken: string) {
    const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
    });
    if (session && session.expires > new Date()) {
        return session.user;
    }
    return null;
}

export async function deleteSession(sessionToken: string) {
    return await prisma.session.delete({ where: { sessionToken } });
}
