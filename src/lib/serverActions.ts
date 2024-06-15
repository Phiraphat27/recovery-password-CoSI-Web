// src/lib/serverActions.ts
"use server";

import { login } from "@/lib/auth";
import { redirect } from "@/navigation";

interface LoginResponse {
    Error?: boolean | string;
    [key: string]: any;
}

export async function handleLogin(formData: FormData): Promise<{ data?: LoginResponse | undefined }> {
    const response: LoginResponse = await login(formData);
    if (response.Error) {
        return { data: response };
    }
    redirect("/office");
    return {}; // Add a return statement at the end of the function
}


