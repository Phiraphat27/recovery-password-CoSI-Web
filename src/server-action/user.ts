"use server"

import prisma from '@/lib/prisma';
import { generator_id, isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT } from '@/lib/secret';

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
            user_name: true,
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