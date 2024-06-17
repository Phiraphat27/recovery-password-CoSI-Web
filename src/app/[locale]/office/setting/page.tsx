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
            desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Sessions",
            value: "sessions",
            icon: Square3Stack3DIcon,
            desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },
    ];
    return (
        <div className="max-w-7xl mx-auto dark:text-white">
            <Tabs value="dashboard">
                <TabsHeader className=" bg-gray-200 dark:bg-transparent dark:text-white dark:border-white dark:border" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
