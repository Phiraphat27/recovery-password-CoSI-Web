"use client";
import React, { use, useEffect } from 'react';
import { useRouter } from '@/navigation';
import { getSession } from '@/lib/auth';

const Auth = () => {
    const router = useRouter();
    useEffect(() => {
        async function session() {
            await getSession().then((res: any) => {
                if (res && res.user) {
                    router.push('/office');
                }
                else {
                    router.push('/');
                }
            });
        }
        session();
    }, []);
    return (
        <></>
    );
}

export default Auth;