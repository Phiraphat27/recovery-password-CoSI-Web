"use server"

import prisma from '@/lib/prisma';
import { isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT, encrypt } from '@/lib/secret';
import { dataURLtoFile } from '@/utils/image/conver';
import { News } from '@/type/news';

export async function createAndUpdateNews(data: News) {
    const session = cookies().get("session")?.value;
    if (!session) return;

    const token = await decryptJWT(session);
    if (!token) return;

    const { image, ...dataForm } = data;

    console.log(dataForm as News)

    const isUnique = await isIdUniqueUser(14);
    let upload: any = {};

    if (data.image && data.imageName) {
        const imageFile = await dataURLtoFile(data.image, data.imageName);
        const formData = new FormData();
        formData.append("file", imageFile);

        upload = await fetch(`http://localhost:4000/upload`, {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
    }

    const dataUpdate: any = {
        publish_date: data.publish_date,
        news_draft: data.draft,
        news_content: {
            update: [
                {
                    where: {
                        language_code_news_id: {
                            language_code: "th",
                            news_id: data.id,
                        },
                    },
                    data: {
                        title: data.th.title,
                        content: typeof data.th.content === "string" ? data.th.content : JSON.stringify(data.th.content),
                    },
                },
                {
                    where: {
                        language_code_news_id: {
                            language_code: "en",
                            news_id: data.id,
                        },
                    },
                    data: {
                        title: data.en.title,
                        content: typeof data.en.content === "string" ? data.en.content : JSON.stringify(data.en.content),
                    },
                },
            ],
        },
    };

    if (data.image && data.imageName) {
        dataUpdate.news_image = upload.file.url;
    }

    const news = await prisma.news.upsert({
        where: {
            news_id: data.id as string,
        },
        update: { ...dataUpdate },
        create: {
            news_id: isUnique,
            news_image: data.image && data.imageName ? upload.file.url : null,
            publish_date: data.publish_date,
            news_draft: data.draft,
            news_content: {
                create: [
                    {
                        language_code: "th",
                        title: data.th.title,
                        content: JSON.stringify(data.th.content) as string,
                    },
                    {
                        language_code: "en",
                        title: data.en.title,
                        content: JSON.stringify(data.en.content) as string,
                    },
                ],
            },
        },
    });

    return news;
}

export async function getNewsList() {
    const session = cookies().get("session")?.value as string;
    const token = await decryptJWT(session)
    if (token === null) {
        return
    }
    const news = await prisma.news.findMany({
        include: {
            news_content: true
        }
    })
    return news
}

export async function getNewsById(id: string) {
    const session = cookies().get("session")?.value as string;
    const token = await decryptJWT(session)
    if (token === null) {
        return
    }
    const news = await prisma.news.findFirst({
        where: {
            news_id: id
        },
        include: {
            news_content: true
        }
    })
    return news
}