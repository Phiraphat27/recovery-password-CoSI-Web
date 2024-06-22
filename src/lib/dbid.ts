import prisma from '@/lib/prisma';

export const generator_str = (length: number, isId:boolean = true) => {
    // add charset symbols if you want
    let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (!isId) {
        charset += '!@#$%^&*()_+{}:"<>?|[];\',./`~';
    }
    let id = '';
    for (let i = 0; i < length; i++) {
        id += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return id;
}

// check if id is unique
export const isIdUniqueUser = async (length: number) => {
    const id = generator_str(length);
    while (true) {
        const user = await prisma.user.findFirst({ where: { user_id: id } });
        if (!user) {
            return id;
        }
    }
}