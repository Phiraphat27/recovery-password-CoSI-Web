import { Prisma } from '@prisma/client';

export type memberType = Prisma.userGetPayload<{
    include: {
        profile: true,
        position: true
    }
}>;