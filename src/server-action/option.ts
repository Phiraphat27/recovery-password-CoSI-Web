"use server"

import prisma from '@/lib/prisma';
import { generator_id, isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT } from '@/lib/secret';

export async function getOption() {
    const lang = cookies().get("NEXT_LOCALE")?.value as string;

    const optionPosition = prisma.position.findMany({
        select: {
            position_id: true,
            position_name: {
                select: {
                    name: true,
                    language_code: true
                }
            }
        }
    })

    const optionDepartment = prisma.department.findMany({
        select: {
            department_id: true,
            department_name: {
                select: {
                    name: true,
                    language_code: true
                }
            }
        }
    })

    const optionPermission = prisma.permission.findMany({
        select: {
            permission_id: true,
            permission_name: {
                select: {
                    name: true,
                    language_code: true
                }
            }
        }
    })

    const option = {
        position: await optionPosition.then((res) => {
            // redata key by language_code
            return res.map((item) => {
                return {
                    value: item.position_id,
                    label: item.position_name.reduce((acc: { [key: string]: { name: string } }, curr) => {
                        acc[curr.language_code] = { name: curr.name };
                        return acc;
                    }, {})
                }
            }
            )
        }
        ),
        department: await optionDepartment.then((res) => {
            return res.map((item) => {
                return {
                    value: item.department_id,
                    label: item.department_name.reduce((acc: { [key: string]: { name: string } }, curr) => {
                        acc[curr.language_code] = { name: curr.name };
                        return acc;
                    }, {})
                }
            }
            )
        }
        ),
        permission: await optionPermission.then((res) => {
            return res.map((item) => {
                return {
                    value: item.permission_id,
                    label: item.permission_name.reduce((acc: { [key: string]: { name: string } }, curr) => {
                        acc[curr.language_code] = { name: curr.name };
                        return acc;
                    }, {})
                }
            }
            )
        }
        )
    }

    return option;
}