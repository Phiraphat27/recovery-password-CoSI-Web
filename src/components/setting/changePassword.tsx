import { changePassword, forgotPassword } from '@/server-action/auth';
import { Button, Input, Typography } from '@material-tailwind/react';
import { FormEvent, useState } from 'react';

export default function ChangePassword() {
    const [formState, setFormState] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        passwordValid: {
            hasUpperCase: false,
            hasLowerCase: false,
            hasNumber: false,
            hasSpecialChar: false,
            hasLength: false,
            hasNotOldPassword: false,
        },
        passwordError: true,
        updateStatus: {
            Success: false,
            Message: '',
        },
        loading: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'newPassword') {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecialChar = /[!@#$%^&*()\-_=+]/.test(value);
            const hasLength = value.length >= 8;
            const hasNotOldPassword = value !== formState.currentPassword;

            setFormState(prevState => ({
                ...prevState,
                passwordValid: {
                    hasUpperCase,
                    hasLowerCase,
                    hasNumber,
                    hasSpecialChar,
                    hasLength,
                    hasNotOldPassword,
                },
            }));
        }

        if (name === 'confirmNewPassword') {
            setFormState(prevState => ({
                ...prevState,
                passwordError: value !== formState.newPassword,
            }));
        }
    };

    const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(formState.passwordValid).includes(false) || formState.passwordError) return;
        if(!formState.currentPassword || !formState.newPassword || !formState.confirmNewPassword) return;

        setFormState(prevState => ({
            ...prevState,
            loading: true,
        }));
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get('confirmNewPassword') as string;
        const password = formData.get('currentPassword') as string;

        console.log({
            password,
            newPassword,
        })

        const res = await changePassword(password, newPassword);
        setFormState(prevState => ({
            ...prevState,
            updateStatus: res,
            loading: false,
        }));

        const bnt = document.getElementById('bnt-submit') as HTMLInputElement;
        bnt.style.backgroundColor = res.Success ? 'green' : 'red';

        setTimeout(() => {
            bnt.style.backgroundColor = '';
            setFormState({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
                passwordValid: {
                    hasUpperCase: false,
                    hasLowerCase: false,
                    hasNumber: false,
                    hasSpecialChar: false,
                    hasLength: false,
                    hasNotOldPassword: false,
                },
                passwordError: true,
                updateStatus: {
                    Success: false,
                    Message: '',
                },
                loading: false,
            });
        }, 3000);
    };

    return (
        <div className="flex justify-evenly flex-col md:flex-row">
            <div className="w-full max-w-lg">
                <div className='font-semibold text-lg'>Change Password</div>
                <div className='font-medium text-md text-gray-500 dark:text-gray-200'>Update your profile information below.</div>
                <div className="pt-6 mb-1 flex flex-col gap-6">
                    <form className="space-y-6" onSubmit={handleUpdatePassword}>
                        <Typography variant="h6" className="!-mb-1 font-normal text-sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Password
                        </Typography>
                        <Input
                            type="password"
                            id="password"
                            name="currentPassword"
                            size="lg"
                            placeholder="********"
                            className="!border-gray-500 focus:!border-gray-900 dark:!border-gray-500 dark:focus:!border-gray-50"
                            value={formState.currentPassword}
                            onChange={handleChange}
                            labelProps={{ className: "before:content-none after:content-none" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                        />
                        <Typography variant="h6" className="!-mb-1 font-normal text-sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            New Password
                        </Typography>
                        <Input
                            type="password"
                            id="new-password"
                            name="newPassword"
                            size="lg"
                            placeholder="********"
                            className="!border-gray-500 focus:!border-gray-900 dark:!border-gray-500 dark:focus:!border-gray-50"
                            value={formState.newPassword}
                            onChange={handleChange}
                            labelProps={{ className: "before:content-none after:content-none" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                        />
                        <Typography variant="h6" className="!-mb-1 font-normal text-sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Confirm New Password
                        </Typography>
                        <Input
                            type="password"
                            id="confirm-new-password"
                            name="confirmNewPassword"
                            size="lg"
                            placeholder="********"
                            className={`${formState.passwordError && formState.passwordValid.hasUpperCase && formState.passwordValid.hasLowerCase && formState.passwordValid.hasNumber && formState.passwordValid.hasSpecialChar && formState.passwordValid.hasLength && formState.passwordValid.hasNotOldPassword && formState.confirmNewPassword.length > 0 ? "!border-red-500 focus:!border-red-600" : "!border-gray-500 focus:!border-gray-900 dark:!border-gray-500 dark:focus:!border-gray-50"} ${!formState.passwordValid.hasUpperCase || !formState.passwordValid.hasLowerCase || !formState.passwordValid.hasNumber || !formState.passwordValid.hasSpecialChar || !formState.passwordValid.hasLength || !formState.passwordValid.hasNotOldPassword ? "!bg-gray-300 pointer-events-none" : ""}`}
                            value={formState.confirmNewPassword}
                            onChange={handleChange}
                            labelProps={{ className: "before:content-none after:content-none" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                        />
                        <Button
                            id="bnt-submit"
                            type="submit"
                            variant="filled"
                            className={`w-fit ${formState.passwordError ? "!bg-gray-500 pointer-events-none" : ""} ${formState.loading && "hidden"}`}
                            loading={formState.loading} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                            {!formState.loading ? (!formState.updateStatus.Message ? "Update Password" : `${formState.updateStatus.Message}`) : "Loading"}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="w-full max-w-md pt-4 md:pt-0">
                <div className='font-semibold text-lg'>Password Requirement </div>
                <div className='font-medium text-md text-gray-500 dark:text-gray-200'>Please follow this guide for a strong password: </div>
                <div className='pt-6 font-normal text-sm'>
                    <ul className='list-disc gap-2 pl-8'>
                        <li className={formState.passwordValid.hasUpperCase ? 'text-green-500' : 'text-red-500'}>At least one uppercase letter</li>
                        <li className={formState.passwordValid.hasLowerCase ? 'text-green-500' : 'text-red-500'}>At least one lowercase letter</li>
                        <li className={formState.passwordValid.hasNumber ? 'text-green-500' : 'text-red-500'}>At least one number</li>
                        <li className={formState.passwordValid.hasSpecialChar ? 'text-green-500' : 'text-red-500'}>At least one special character ( ! @ # $ % ^ & * ( ) - _ = + )</li>
                        <li className={formState.passwordValid.hasLength ? 'text-green-500' : 'text-red-500'}>Minimum 8 characters</li>
                        <li className={formState.passwordValid.hasNotOldPassword ? 'text-green-500' : 'text-red-500'}>Not the same as the current password</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
