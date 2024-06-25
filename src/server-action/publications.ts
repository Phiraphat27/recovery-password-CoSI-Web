"use server"

import prisma from '@/lib/prisma';
import { isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT, encrypt } from '@/lib/secret';

export async function createPublications(data: any) {
    const session = cookies().get("session")?.value;
    if (!session) return;

    const token = await decryptJWT(session);
    if (!token) return;

    const id = await isIdUniqueUser(10);

    console.log("data: ", data);

    await prisma.papers.upsert({
        where: {
            paper_id: data.id
        },
        update: {
            paper_title: data.title,
            paper_abstract: data.abstract,
            paper_authors: data.authors,
            paper_url: data.link,
            paper_keyworlds: data.keyworlds,
            paper_date: data.datePublish ? new Date(data.datePublish) : null,
            paper_draft: data.draft,
        },
        create: {
            paper_id: id,
            paper_title: data.title,
            paper_abstract: data.abstract,
            paper_authors: data.authors,
            paper_url: data.link,
            paper_keyworlds: data.keyworlds,
            paper_date: data.datePublish ? new Date(data.datePublish) : null,
            paper_draft: data.draft,
        }
    });

    return;
}

export async function deletePublications(id: string) {
    const session = cookies().get("session")?.value;
    if (!session) return;

    const token = await decryptJWT(session);
    if (!token) return;

    await prisma.papers.delete({
        where: {
            paper_id: id
        }
    });

    return;
}

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
            publish: !item.paper_draft,
            id: item.paper_id,
        };
    });

    return newData;
}

export async function getPublicationsById(id: string) {
    const session = cookies().get("session")?.value;
    if (!session) return;

    const token = await decryptJWT(session);
    if (!token) return;

    const data = await prisma.papers.findFirst({
        where: {
            paper_id: id
        }
    });

    if (!data) return;

    const newData = {
        title: data.paper_title,
        abstract: data.paper_abstract,
        authors: data.paper_authors,
        link: data.paper_url,
        keyworlds: data.paper_keyworlds,
        datePublish: data.paper_date ? new Date(data.paper_date).getTime() : null,
        dateEdit: data.edit_date ? new Date(data.edit_date).getTime() : null,
        draft: data.paper_draft,
        id: data.paper_id,
    };

    return newData;
}