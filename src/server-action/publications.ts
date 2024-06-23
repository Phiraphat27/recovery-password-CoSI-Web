"use server"

import prisma from '@/lib/prisma';
import { isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT, encrypt } from '@/lib/secret';

export async function getPublicationsList() {
    const session = cookies().get("session")?.value;
    if (!session) return;

    const token = await decryptJWT(session);
    if (!token) return;

    const data = await prisma.papers.findMany();

    const newData = data.map((item) => {
        return {
            title: item.paper_title,
            datePublish: item.paper_date ? new Date(item.paper_date).getTime() : null,
            dateEdit: item.edit_date ? new Date(item.edit_date).getTime() : null,
            publish: !item.publish_draft,
            id: item.paper_id,
        };
    });

    return newData;
}