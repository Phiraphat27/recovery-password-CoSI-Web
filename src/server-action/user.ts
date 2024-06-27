"use server"

import prisma from '@/lib/prisma';
import { generator_str, isIdUniqueUser } from '@/lib/dbid';
import { cookies } from 'next/headers';
import { decryptJWT, encrypt } from '@/lib/secret';
import { memberProfile } from '@/type/member';
import { dataURLtoFile } from '@/utils/image/conver';
// import { File } from 'node-fetch';

// function dataURLtoFile(dataurl: any, filename: string) {
//     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
// }

export async function createAndUpdateUser(data: memberProfile) {
    const session = cookies().get("session")?.value as string;
    const token = await decryptJWT(session)
    if (token === null) {
        return
    }
    const { user_password, ...rest } = data
    const isUnique = await isIdUniqueUser(14)
    const password = await encrypt(user_password as string)

    let upload:any = {};

    console.log(data.image)
    console.log(data.imageName)

    if (data.image && data.imageName) {
        const imageFile = await dataURLtoFile(data.image as string, data.imageName as string)
        const image = new FormData()
        image.append("file", imageFile as File)
        upload = await fetch(`http://localhost:4000/upload`, {
            method: "POST",
            body: image
        }).then((res) => {
            return res.json()
        }).then((res) => {
            return res
        })
    }

    let dataUpate:any = {
        user_email: rest.email as string,
        user_email_dispaly: rest.emailDisplay as string,
        user_position: rest.position as string,
        user_permission: rest.permission as string,
        user_department: rest.department as string,
        user_git: rest.github as string,
        profile: {
            update: [
                {
                    where: {
                        language_code_user_id: {
                            language_code: "en",
                            user_id: rest.userId as string
                        }
                    },
                    data: {
                        name: rest.en.name as string,
                        details: typeof rest.en.biography === "string" ? rest.en.biography : JSON.stringify(rest.en.biography) as string
                    }
                },
                {
                    where: {
                        language_code_user_id: {
                            language_code: "th",
                            user_id: rest.userId as string
                        }
                    },
                    data: {
                        name: rest.th.name as string,
                        details: typeof rest.th.biography === "string" ? rest.th.biography : JSON.stringify(rest.th.biography) as string
                    }
                }
            ]
        }
    }

    if (data.image && data.imageName) {
        dataUpate = {
            ...dataUpate,
            user_image: upload.file.url as string
        }
    }

    return await prisma.user.upsert({
        where: {
            user_id: rest.userId as string
        },
        update: {
            ...dataUpate
        },
        create: {
            user_id: isUnique as string,
            user_password: password,
            user_email: rest.email+"@cosi.bu.ac.th" as string,
            user_email_dispaly: rest.emailDisplay as string,
            user_image: upload.file?.url as string,
            user_position: rest.position as string,
            user_permission: rest.permission as string,
            user_department: rest.department as string,
            user_git: rest.github as string,
            profile: {
                create: [
                    {
                        language_code: "en",
                        name: rest.en.name as string,
                        details: JSON.stringify(rest.en.biography) as string
                    },
                    {
                        language_code: "th",
                        name: rest.th.name as string,
                        details: JSON.stringify(rest.th.biography) as string
                    }
                ]
            }
        }
    }).then((user) => {
        return user
    }
    )
}

export async function deleteUser(id: string) {
    return await prisma.user.delete({
        where: {
            user_id: id
        }
    }).then((user) => {
        return user
    })
}

export async function getUserById(id?: string) {
    const session = cookies().get("session")?.value as string;
    const token = await decryptJWT(session)
    if (token === null) {
        return
    }
    id = !id ? token.user.user_id : decodeURIComponent(id)
    console.log(`id: ${id}`)
    return await prisma.user.findUnique({
        where: {
            user_id: id
        },
        include: {
            profile: true,
            position: {
                select: {
                    position_name: true
                }
            },
            permission: {
                select: {
                    permission_name: true
                }
            },
            department: {
                select: {
                    department_name: true
                }
            },
        }
    }).then((user) => {
        const { user_password, ...rest } = user as any
        const result = {
            userId: rest.user_id,
            emailDisplay: rest.user_email_dispaly,
            position: rest.user_position,
            department: rest.user_department,
            permission: rest.user_permission,
            github: rest.user_git,
            email: rest.user_email,
            password: "",
            image: rest.user_image,
            th: {
                name: rest.profile.find((item: any) => item.language_code === "th").name,
                biography: rest.profile.find((item: any) => item.language_code === "th").details
            },
            en: {
                name: rest.profile.find((item: any) => item.language_code === "en").name,
                biography: rest.profile.find((item: any) => item.language_code === "en").details
            }
        }
        return result
    }).catch((err) => {
        return err
    })
}

export async function getUserList() {
    const lang = cookies().get("NEXT_LOCALE")?.value as string;
    return await prisma.user.findMany({
        select: {
            user_id: true,
            user_image: true,
            user_email: true,
            user_join: true,
            profile: {
                where: {
                    language_code: lang
                },
                select: {
                    name: true
                }
            },
            position: {
                select: {
                    position_name: {
                        where: {
                            language_code: lang
                        },
                    }
                }
            },
            permission: {
                select: {
                    permission_name: {
                        where: {
                            language_code: lang
                        },
                    }
                }
            },
            department: {
                select: {
                    department_name: {
                        where: {
                            language_code: lang
                        },
                    }
                }
            },
        }
    }).then((users) => {
        let newdata = users.map((item) => {
            const { user_password, ...rest } = item as any
            return rest
        })
        // order by user name
        newdata.sort((a: any, b: any) => {
            if (a.profile[0].name < b.profile[0].name) {
                return -1;
            }
            if (a.profile[0].name > b.profile[0].name) {
                return 1;
            }
            return 0;
        })

        return newdata
    }).catch((err) => {
        return err
    })
}