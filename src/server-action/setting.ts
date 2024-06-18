"use server"

import prisma from '@/lib/prisma';
import { generator_id, isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { listSessionData } from '@/type/sessionData';
import { decryptJWT } from '@/lib/secret';

export async function getDataSession() {
    const sessionToken = cookies().get("session")?.value as string;
    const lang = cookies().get("NEXT_LOCALE")?.value as string;
    const dataResponse: listSessionData[] = [];

    if (!sessionToken) {
        return null;
    }

    const dataUser = await decryptJWT(sessionToken);

    const sessions = await prisma.session.findMany({
        where: {
            userId: dataUser.user.user_id,
        },
    });

    await Promise.all(sessions.map(async (session) => {
        if (typeof session.lat === 'number' && typeof session.lon === 'number') {
            const { id, userId, expires, lat, lon, ...sessionData } = session;
            const isCurrent = session.sessionToken === sessionToken;

            if (session.lat === 0 && session.lon === 0) {
                dataResponse.push({ ...sessionData, isCurrent, location: { city: "Unknown", country: "Unknown" } });
                return;
            }

            const dataGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${session.lat}&longitude=${session.lon}&localityLanguage=${lang}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());

            
            dataResponse.push({ ...sessionData, isCurrent, location: { city: dataGeo.principalSubdivision, country: dataGeo.countryName } });
        }
    }));

    return dataResponse;
}
