import { Prisma } from "@prisma/client"

export type sessionData = Prisma.userGetPayload<{
    select: {
        user_id: true,
        user_email: true,
        user_password: true,
        user_name: true,
        user_image: true,
        permission: {
            select: { permission_name: true }
        },
        position: {
            select: { position_name: true }
        },
        profile: {
            select: {
                name: true,
                language_code: true,
            }
        }
    }
}>