import { Button, Switch } from "@material-tailwind/react";

const listTwoFactor = [
    {
        title: "Recovery email",
        description: "Add a recovery email to secure your account.",
    },
    {
        title: "SMS Number",
        description:
            "Opt for SMS-based authentication, where a unique code is sent to your registered mobile number.",
    },
    {
        title: "Authenticator App",
        description:
            "Generate time-based one-time passwords (TOTPs) for authentication.",
    },
];

const TwoFactor: React.FC = () => {
    return (
        <div className="w-full items-center">
            <div className="flex items-center justify-between">
                <div>
                    <div className="font-semibold text-lg">Two-factor Authentication</div>
                    <div className="font-medium text-md text-gray-500 dark:text-gray-200">
                        Enable two-factor authentication for your account.
                    </div>
                </div>
                <div className="flex gap-2">
                    <Switch
                        className="h-full w-full checked:bg-[#2ec946] bg-red-600"
                        containerProps={{
                            className: "w-11 h-6",
                        }}
                        circleProps={{
                            className: "before:hidden left-0.5 border-none",
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                    />
                </div>
            </div>
            <div className="flex flex-col gap-5 pt-6">
                {listTwoFactor.map((item, index) => (
                    <div key={index} className="flex items-center justify-between pb-6 border-b-[2px] border-gray-200">
                        <div>
                            <div className="font-semibold text-md">{item.title}</div>
                            <div className="font-medium text-sm text-gray-500 dark:text-gray-200">
                                {item.description}
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="font-semibold text-sm text-gray-500 dark:text-gray-200">Not configured</div>
                            <Button size="sm" variant="outlined" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Edit</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TwoFactor;
