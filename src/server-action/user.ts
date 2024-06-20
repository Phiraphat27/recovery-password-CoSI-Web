"use server"

import prisma from '@/lib/prisma';
import { generator_id, isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT, encrypt } from '@/lib/secret';
import { memberProfile } from '@/type/member';

export async function createUser(data: memberProfile) {
    const { user_password, ...rest } = data
    const isUnique = await isIdUniqueUser(14)
    const password = await encrypt(user_password as string)
    if (isUnique) {
        return await prisma.user.create({
            data: {
                user_id: isUnique,
                user_password: password,
                user_email: rest.email as string,
                user_email_dispaly: rest.emailDisplay as string,
                user_image: rest.image as string,
                user_position: rest.position as string,
                user_permission: rest.permission as string,
                user_department: rest.department as string,
                user_git: rest.github as string,
                profile: {
                    create: [
                        {
                            language_code: "en",
                            name: rest.en.name as string,
                            details: JSON.stringify(rest.en.biography) as string
                        },
                        {
                            language_code: "th",
                            name: rest.th.name as string,
                            details: JSON.stringify(rest.th.biography) as string
                        }
                    ]
                },
            }
        }).then((user) => {
            return user
        }).catch((err) => {
            return err
        })
    } else {
        return "ID is not unique"
    }
}

export async function getUserById(id: string) {
    return await prisma.user.findUnique({
        where: {
            user_id: id
        },
        include: {
            profile: true,
            position:{
                select:{
                    position_name: true
                }
            },
            permission:{
                select:{
                    permission_name: true
                }
            },
            department:{
                select:{
                    department_name: true
                }
            },
        }
    }).then((user) => {
        const { user_password , ...rest } = user as any
        return rest
    }).catch((err) => {
        return err
    })
}

export async function getUserList() {
    const lang = cookies().get("NEXT_LOCALE")?.value as string;
    return await prisma.user.findMany({
        select: {
            user_id: true,
            user_image: true,
            user_email: true,
            user_join : true,
            profile: {
                where: {
                    language_code: lang
                },
                select: {
                    name: true
                }
            },
            position:{
                select:{
                    position_name: {
                        where: {
                            language_code: lang
                        },
                    }
                }
            },
            permission:{
                select:{
                    permission_name: {
                        where: {
                            language_code: lang
                        },
                    }
                }
            },
            department:{
                select:{
                    department_name: {
                        where: {
                            language_code: lang
                        },
                    }
                }
            },
        }
    }).then((users) => {
        const newdata = users.map((item) => {
            const { user_password , ...rest } = item as any
            return rest
        })
        return newdata
    }).catch((err) => {
        return err
    })
}