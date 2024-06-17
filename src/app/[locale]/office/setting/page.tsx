"use client";
import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    KeyIcon,
    FingerPrintIcon
} from "@heroicons/react/24/solid";
import ChangePassword from "@/components/setting/changePassword";
import TwoFactor from "@/components/setting/twoFactor";
import Sessions from "@/components/setting/sessions";

export function TabsWithIcon() {
    const data = [
        {
            label: "Password",
            value: "password",
            icon: KeyIcon,
            desc:
                <>
                    <ChangePassword />
                </>
        },
        {
            label: "Two-factor",
            value: "twoFactor",
            icon: FingerPrintIcon,
            desc:
                <>
                    <TwoFactor />
                </>,
        },
        {
            label: "Sessions",
            value: "sessions",
            icon: Square3Stack3DIcon,
            desc:
                <>
                    <Sessions />
                </>,
        },
    ];
    return (
        <div className="max-w-7xl mx-auto">
            <Tabs
                value="dashboard"
                className=""
            >
                <TabsHeader className="dark:bg-white bg-gray-300"
                    indicatorProps={{
                        className: "dark:bg-gray-900/20 dark:shadow-none",
                    }}
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {data.map(({ label, value, icon }) => (
                        <Tab
                            key={value}
                            value={value}
                            className="dark:text-gray-700" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <div className="flex items-center gap-2">
                                {React.createElement(icon, { className: "w-5 h-5" })}
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody className="dark:text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {data.map(({ value, desc }) => (
                        <TabPanel className="dark:text-white" key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}

export default TabsWithIcon;
