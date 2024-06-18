export interface TwoFactorData {
    email: string;
    auth_app: string;
    enable: boolean;
    [key: string]: string | boolean;
}