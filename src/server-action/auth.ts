"use server";
import prisma from '@/lib/prisma';
import { generator_id, isIdUniqueUser } from '@/lib/dbid';
import { encrypt, decrypt, encryptJWT, decryptJWT } from '@/lib/secret';
import { cookies, headers } from 'next/headers';
import { sessionData } from '@/type/sessionData';
import { userAgent } from 'next/server';

// export async function registerUser(
//     email: string,
//     password: string,
//     name: string,
//     permission: string,
//     position: string,
// ) {
//     const hashedPassword = await encrypt(password);
//     return await prisma.user.create({
//         data: {
//             user_email: email,
//             user_password: hashedPassword,
//             user_join: new Date(),
//             user_id: await isIdUniqueUser(14),
//             user_image: '',
//             user_profile: '',
//             user_permission: permission,
//             user_position: position,
//         },
//     });
// }

export async function forgotPassword(email: string ,password: string) {
    const user = await prisma.user.findFirst({ where: { user_email: email } });
    if (user) {
        const hashedPassword = await encrypt(password);
        await prisma.user.update({
            where: { user_id: user.user_id },
            data: { user_password: hashedPassword },
        });
        return true;
    }
    return false;
}

export async function changePassword(
    oldPassword: string,
    newPassword: string,
    email?: string
) {
    const userSession = await getSession();
    if (!email) {
        email = userSession.user.user_email;
    }
    const user = await prisma.user.findFirst({ where: { user_email: email } });
    if (user && await decrypt(user.user_password) === oldPassword) {
        const hashedPassword = await encrypt(newPassword);
        await prisma.user.update({
            where: { user_id: user.user_id },
            data: { user_password: hashedPassword },
        });
        return {
            Success: true,
            Message: "Password Successfully",
        };
    }
    else{
        return {
            Success: false,
            Message: "Password incorrect",
        };
    }
}

async function authenticateUser(email: string, password: string) {
    const user = await prisma.user.findFirst(
        {
            where: { user_email: email },
            select: {
                user_id: true,
                user_email: true,
                user_password: true,
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

export async function login(
    formData: FormData,
    position: {
        latitude: number;
        longitude: number;
    }
) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const user = await authenticateUser(email, password);

    if (!user) {
        return { Error: "Invalid Email or Password" };
    }
    // console.log(`request : ${request}`);
    const sessionToken = await createSession(user as sessionData, position);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("session", sessionToken, { expires, httpOnly: true }); // 7 days
    return { Success: true };
}

export async function createSession(
    user: sessionData,
    position: {
        latitude: number;
        longitude: number;
    }
) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const userdevice = userAgent({ headers: headers() });
    user = { ...user, userdevice, position } as any;
    const sessionToken = await encryptJWT({ user, expires });
    const session = await prisma.session.create({
        data: {
            sessionToken,
            browser: userdevice.browser.name as string,
            os: userdevice.os.name as string,
            lat : position.latitude,
            lon : position.longitude,
            userId: user.user_id,
            expires: expires, // 7 days
        },
    });
    return session.sessionToken;
}

export async function getSession(): Promise<any> {
    const sessionStore = await prisma.session.findFirst({
        where: { sessionToken: cookies().get("session")?.value as string },
        include: { user: true },
    });

    if (!sessionStore) {
        return null;
    }
    
    const sessionToken = cookies().get("session");
    if (!sessionToken) {
        return null;
    }
    return await decryptJWT(sessionToken?.value as string);
}

export async function deleteSession(sessionToken: string) {
    return await prisma.session.delete({ where: { sessionToken } }).then(() => {
        return { Success: true };
    }).catch(() => {
        return { Success: false };
    })
}

export async function logout() {
    const sessionToken = cookies().get("session");
    if (sessionToken) {
        await deleteSession(sessionToken.value as string).then(() => {
            cookies().set("session", "", { expires: new Date(0) });
        });
    }
    return { Success: true };
}
