"use client";
import React, { useEffect } from 'react';
import { useRouter } from '@/navigation';
import { getSession } from '@/server-action/auth';
import { usePathname } from '@/navigation';

const Auth = () => {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        async function session() {
            const res = await getSession();
            if (res && res.user) {
                if (pathname === '/') {
                    router.push('/office');
                }
            } else {
                router.push('/');
            }
        }
        session();
    }, [router]);
    return (
        <></>
    );
}

export default Auth;
