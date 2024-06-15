import prisma from '@/lib/prisma';

export const generator_id = (length: number) => {
    // add charset symbols if you want
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'; 
    let id = '';
    for (let i = 0; i < length; i++) {
        id += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return id;
}

// check if id is unique
export const isIdUniqueUser = async () => {
    const id = generator_id(14);
    while (true) {
        const user = await prisma.user.findFirst({ where: { user_id: id } });
        if (!user) {
            return id;
        }
    }
}