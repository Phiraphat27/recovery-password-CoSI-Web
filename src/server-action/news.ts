"use server"

import prisma from '@/lib/prisma';
import { isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT, encrypt } from '@/lib/secret';

export async function getNewsList() {
    const session = cookies().get("session")?.value as string;
    const token = await decryptJWT(session)
    if (token === null) {
        return
    }
    const news = await prisma.news.findMany()
    return news
}