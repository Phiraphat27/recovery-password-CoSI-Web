import { Prisma } from '@prisma/client';

export type memberType = Prisma.userGetPayload<{
    include: {
        profile: true,
        position: true
    }
}>;

export interface memberProfile {
    [key: string]: string | object | {
        [key: string]: string | object;
    };
    position: string;
    department: string;
    permission: string;
    github: string;
    emailDisplay: string;
    email: string;
    password: string;
    image: string;
    th: {
        [key: string]: string | object;
        name: string;
        biography: object;
    };
    en: {
        [key: string]: string | object;
        name: string;
        biography: object;
    };
}
