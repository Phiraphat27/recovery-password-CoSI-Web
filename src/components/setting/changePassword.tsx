// pages/change-password.tsx

import { Button, Input, Typography } from '@material-tailwind/react';
import { useState } from 'react';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasLength: false,
    });
    const [passwordError, setPasswordError] = useState(true);

    const handlePassword = (e: React.FormEvent) => {
        e.preventDefault();
        const password = (e.currentTarget as HTMLInputElement).value;
        setCurrentPassword(password);
    }

    const handleCheckPassword = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your password check logic here
        // Minimum 8 characters
        // At least one uppercase letter
        // At least one lowercase letter
        // At least one number
        // At least one special character  ( ! @ # $ % ^ & * ( ) - _ = + )

        // Password check logic
        const password = (e.currentTarget as HTMLInputElement).value;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        // Special characters
        const specialChars = /[!@#$%^&*()\-_=+]/;
        const hasSpecialChar = specialChars.test(password);

        // Length
        const hasLength = password.length >= 8;

        if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasLength) {
            setNewPassword(password);
        }

        setPasswordValid({
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            hasLength,
        });

        console.log('Password checked');
    }

    const handlePasswordConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        const newPassword = (document.getElementById('new-password') as HTMLInputElement).value;
        const confirmNewPassword = (e.currentTarget as HTMLInputElement).value;
        setConfirmNewPassword(confirmNewPassword);

        if (newPassword !== confirmNewPassword) {
            setPasswordError(true);
            return;
        }
        else {
            setPasswordError(false);
        }
        
    }

    return (
        <div className="flex justify-evenly flex-col md:flex-row">
            <div className="w-full max-w-lg">
                <div className='font-semibold text-lg'>Change Password</div>
                <div className='font-medium text-md text-gray-500 dark:text-gray-200'>Update your profile information below.</div>
                <div className="pt-6 mb-1 flex flex-col gap-6">
                    <Typography variant="h6" className="-mb-3 font-normal text-sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Password
                    </Typography>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-gray-500 focus:!border-gray-900 dark:!border-gray-500 dark:focus:!border-gray-50"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    <Typography variant="h6" className="-mb-3 font-normal text-sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        New Password
                    </Typography>
                    <Input
                        type="password"
                        id="new-password"
                        name="new-password"
                        size="lg"
                        placeholder="********"
                        className=" !border-gray-500 focus:!border-gray-900 dark:!border-gray-500 dark:focus:!border-gray-50"
                        onChange={handleCheckPassword}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    <Typography variant="h6" className="-mb-3 font-normal text-sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Confirm New Password
                    </Typography>
                    <Input
                        type="password"
                        id="confirm-new-password"
                        name="confirm-new-password"
                        size="lg"
                        placeholder="********"
                        className={`${passwordError && passwordValid.hasUpperCase && passwordValid.hasLowerCase && passwordValid.hasNumber && passwordValid.hasSpecialChar && passwordValid.hasLength && confirmNewPassword.length > 0 ? " !border-red-500 focus:!border-red-600" : "!border-gray-500 focus:!border-gray-900 dark:!border-gray-500 dark:focus:!border-gray-50"} 
                            ${!passwordValid.hasUpperCase || !passwordValid.hasLowerCase || !passwordValid.hasNumber || !passwordValid.hasSpecialChar || !passwordValid.hasLength ? " !bg-gray-300 pointer-events-none" : ""}`}
                        onChange={handlePasswordConfirm}
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    <Button variant="filled" className={`w-fit ${passwordError ? "!bg-gray-500 pointer-events-none" : ""}`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Update Password
                    </Button>
                    <Button className='justify-center w-fit' loading={true} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Loading
                    </Button>
                </div>
            </div>
            <div className="w-full max-w-md pt-4 md:pt-0">
                <div className='font-semibold text-lg'>Password Requirement </div>
                <div className='font-medium text-md text-gray-500 dark:text-gray-200'>Please follow this guide for a strong password: </div>
                <div className='pt-6 font-normal text-sm'>
                    <ul className='list-disc gap-2 pl-8'>
                        {
                            passwordValid.hasUpperCase ? <li className='text-green-500'> At least one uppercase letter</li> : <li className='text-red-500'>At least one uppercase letter</li>
                        }
                        {
                            passwordValid.hasLowerCase ? <li className='text-green-500'>At least one lowercase letter</li> : <li className='text-red-500'>At least one lowercase letter</li>
                        }
                        {
                            passwordValid.hasNumber ? <li className='text-green-500'>At least one number</li> : <li className='text-red-500'>At least one number</li>
                        }
                        {
                            passwordValid.hasSpecialChar ? <li className='text-green-500'>At least one special character  ( ! @ # $ % ^ & * ( ) - _ = + )</li> : <li className='text-red-500'>At least one special character <br/>  ( ! @ # $ % ^ & * ( ) - _ = + )</li>
                        }
                        {
                            passwordValid.hasLength ? <li className='text-green-500'>Minimum 8 characters</li> : <li className='text-red-500'>Minimum 8 characters</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
